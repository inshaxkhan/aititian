/**
 * AI Diet Plan Generator
 * Integrates with OpenAI API to generate personalized diet recommendations
 */

import { IUser } from '@/models/User';
import { IMeal } from '@/models/DietPlan';

export interface DietPlanRequest {
  user: IUser;
  targetCalories: number;
  duration: number; // days
  preferences?: string[];
}

export interface GeneratedDietPlan {
  planName: string;
  totalCalories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  meals: {
    breakfast: IMeal[];
    lunch: IMeal[];
    dinner: IMeal[];
    snacks: IMeal[];
  };
  aiRecommendations: string;
}

/**
 * Generate personalized diet plan using AI
 */
export async function generateDietPlan(request: DietPlanRequest): Promise<GeneratedDietPlan> {
  const { user, targetCalories, duration, preferences = [] } = request;
  
  // Construct AI prompt based on user data
  const prompt = buildDietPlanPrompt(user, targetCalories, duration, preferences);
  
  try {
    // In a real implementation, this would call OpenAI API
    // For now, we'll return a mock response
    const aiResponse = await callAIService(prompt);
    
    return parseDietPlanResponse(aiResponse, targetCalories);
  } catch (error) {
    console.error('Error generating diet plan:', error);
    throw new Error('Failed to generate personalized diet plan');
  }
}

/**
 * Build comprehensive prompt for AI diet generation
 */
function buildDietPlanPrompt(
  user: IUser,
  targetCalories: number,
  duration: number,
  preferences: string[]
): string {
  const { profile, healthGoals, medicalInfo } = user;
  
  return `
    Create a personalized ${duration}-day diet plan for a ${profile.age}-year-old ${profile.gender} 
    with the following characteristics:
    
    Physical Stats:
    - Weight: ${profile.weight}kg
    - Height: ${profile.height}cm
    - Activity Level: ${profile.activityLevel}
    
    Health Goals:
    - Primary Goal: ${healthGoals.primaryGoal}
    - Target Weight: ${healthGoals.targetWeight}kg
    - Timeframe: ${healthGoals.timeframe} weeks
    
    Medical Information:
    - Allergies: ${medicalInfo.allergies.join(', ') || 'None'}
    - Medical Conditions: ${medicalInfo.conditions.join(', ') || 'None'}
    - Dietary Restrictions: ${medicalInfo.dietaryRestrictions.join(', ') || 'None'}
    
    Requirements:
    - Target daily calories: ${targetCalories}
    - Balanced macronutrients (protein: 25-30%, carbs: 40-45%, fats: 25-30%)
    - Include breakfast, lunch, dinner, and 2 snacks
    - Consider cultural preferences: ${preferences.join(', ')}
    - Provide meal preparation instructions
    - Include nutritional breakdown for each meal
    
    Please provide a detailed meal plan with specific recipes, ingredients, and nutritional information.
  `;
}

/**
 * Mock AI service call (replace with actual OpenAI integration)
 */
async function callAIService(prompt: string): Promise<string> {
  // In production, this would be:
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [{ role: "user", content: prompt }],
  //   max_tokens: 2000,
  // });
  // return response.choices[0].message.content;
  
  // Mock response for development
  return `
    {
      "planName": "Balanced Nutrition Plan",
      "recommendations": "This plan focuses on balanced nutrition with adequate protein for muscle maintenance, complex carbohydrates for sustained energy, and healthy fats for hormone production.",
      "meals": {
        "breakfast": [
          {
            "name": "Greek Yogurt Parfait with Berries",
            "ingredients": ["200g Greek yogurt", "50g mixed berries", "30g granola", "1 tbsp honey"],
            "calories": 320,
            "macros": { "protein": 20, "carbs": 35, "fats": 8 },
            "preparationTime": 5,
            "instructions": ["Layer yogurt with berries", "Top with granola", "Drizzle with honey"],
            "tags": ["vegetarian", "high-protein"]
          }
        ],
        "lunch": [
          {
            "name": "Grilled Chicken Salad",
            "ingredients": ["150g grilled chicken breast", "100g mixed greens", "50g cherry tomatoes", "30g avocado", "2 tbsp olive oil vinaigrette"],
            "calories": 420,
            "macros": { "protein": 35, "carbs": 12, "fats": 22 },
            "preparationTime": 15,
            "instructions": ["Grill chicken breast", "Prepare salad base", "Add toppings", "Dress with vinaigrette"],
            "tags": ["high-protein", "low-carb"]
          }
        ],
        "dinner": [
          {
            "name": "Baked Salmon with Quinoa",
            "ingredients": ["150g salmon fillet", "100g cooked quinoa", "150g steamed broccoli", "1 tbsp olive oil", "lemon", "herbs"],
            "calories": 480,
            "macros": { "protein": 32, "carbs": 28, "fats": 24 },
            "preparationTime": 25,
            "instructions": ["Season and bake salmon", "Cook quinoa", "Steam broccoli", "Serve with lemon"],
            "tags": ["omega-3", "complete-protein"]
          }
        ],
        "snacks": [
          {
            "name": "Apple with Almond Butter",
            "ingredients": ["1 medium apple", "2 tbsp almond butter"],
            "calories": 280,
            "macros": { "protein": 8, "carbs": 25, "fats": 16 },
            "preparationTime": 2,
            "instructions": ["Slice apple", "Serve with almond butter"],
            "tags": ["natural", "fiber-rich"]
          }
        ]
      }
    }
  `;
}

/**
 * Parse AI response into structured diet plan
 */
function parseDietPlanResponse(aiResponse: string, targetCalories: number): GeneratedDietPlan {
  try {
    const parsed = JSON.parse(aiResponse);
    
    // Calculate total macronutrients
    const allMeals = [
      ...parsed.meals.breakfast,
      ...parsed.meals.lunch,
      ...parsed.meals.dinner,
      ...parsed.meals.snacks,
    ];
    
    const totalMacros = allMeals.reduce(
      (acc, meal) => ({
        protein: acc.protein + meal.macros.protein,
        carbs: acc.carbs + meal.macros.carbs,
        fats: acc.fats + meal.macros.fats,
        fiber: acc.fiber + (meal.macros.fiber || 0),
      }),
      { protein: 0, carbs: 0, fats: 0, fiber: 0 }
    );
    
    return {
      planName: parsed.planName,
      totalCalories: targetCalories,
      macronutrients: totalMacros,
      meals: parsed.meals,
      aiRecommendations: parsed.recommendations,
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw new Error('Failed to parse diet plan response');
  }
}

/**
 * Generate meal suggestions for specific meal type
 */
export async function generateMealSuggestions(
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  calorieTarget: number,
  dietaryRestrictions: string[] = [],
  preferences: string[] = []
): Promise<IMeal[]> {
  const prompt = `
    Generate 3 ${mealType} meal options with approximately ${calorieTarget} calories each.
    Dietary restrictions: ${dietaryRestrictions.join(', ') || 'None'}
    Preferences: ${preferences.join(', ') || 'None'}
    
    Include detailed nutritional information and preparation instructions.
  `;
  
  try {
    const aiResponse = await callAIService(prompt);
    const parsed = JSON.parse(aiResponse);
    return parsed.meals || [];
  } catch (error) {
    console.error('Error generating meal suggestions:', error);
    return [];
  }
}