/**
 * Health Calculations Utility
 * Contains functions for BMI, BMR, body fat percentage, and calorie calculations
 */

export interface HealthMetrics {
  bmi: number;
  bmr: number;
  bodyFatPercentage: number;
  dailyCalorieNeeds: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

export interface UserHealthData {
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
}

/**
 * Calculate Body Mass Index (BMI)
 * Formula: weight (kg) / (height (m))^2
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 * More accurate than Harris-Benedict equation
 */
export function calculateBMR(age: number, weight: number, height: number, gender: string): number {
  let bmr: number;
  
  if (gender === 'male') {
    // BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    // BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  return Math.round(bmr);
}

/**
 * Calculate body fat percentage using BMI-based estimation
 * Note: This is an approximation. DEXA scan or other methods are more accurate
 */
export function calculateBodyFatPercentage(bmi: number, age: number, gender: string): number {
  let bodyFat: number;
  
  if (gender === 'male') {
    bodyFat = 1.20 * bmi + 0.23 * age - 16.2;
  } else {
    bodyFat = 1.20 * bmi + 0.23 * age - 5.4;
  }
  
  // Ensure reasonable bounds
  return Math.max(5, Math.min(50, Math.round(bodyFat * 10) / 10));
}

/**
 * Calculate daily calorie needs based on BMR and activity level
 * Uses activity multipliers from exercise science research
 */
export function calculateDailyCalorieNeeds(bmr: number, activityLevel: string): number {
  const activityMultipliers = {
    sedentary: 1.2,           // Little or no exercise
    lightly_active: 1.375,    // Light exercise 1-3 days/week
    moderately_active: 1.55,  // Moderate exercise 3-5 days/week
    very_active: 1.725,       // Hard exercise 6-7 days/week
    extremely_active: 1.9,    // Very hard exercise, physical job
  };
  
  const multiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.55;
  return Math.round(bmr * multiplier);
}

/**
 * Determine health risk level based on BMI and other factors
 */
export function calculateRiskLevel(bmi: number, age: number, conditions: string[]): 'low' | 'moderate' | 'high' {
  let riskScore = 0;
  
  // BMI-based risk
  if (bmi < 18.5 || bmi > 30) {
    riskScore += 2;
  } else if (bmi > 25) {
    riskScore += 1;
  }
  
  // Age-based risk
  if (age > 65) {
    riskScore += 1;
  } else if (age > 45) {
    riskScore += 0.5;
  }
  
  // Medical conditions risk
  const highRiskConditions = ['diabetes', 'hypertension', 'heart_disease', 'high_cholesterol'];
  const hasHighRiskCondition = conditions.some(condition => 
    highRiskConditions.includes(condition.toLowerCase())
  );
  
  if (hasHighRiskCondition) {
    riskScore += 2;
  }
  
  // Determine risk level
  if (riskScore >= 3) {
    return 'high';
  } else if (riskScore >= 1.5) {
    return 'moderate';
  } else {
    return 'low';
  }
}

/**
 * Calculate comprehensive health metrics
 */
export function calculateHealthMetrics(userData: UserHealthData, conditions: string[] = []): HealthMetrics {
  const { age, weight, height, gender, activityLevel } = userData;
  
  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(age, weight, height, gender);
  const bodyFatPercentage = calculateBodyFatPercentage(bmi, age, gender);
  const dailyCalorieNeeds = calculateDailyCalorieNeeds(bmr, activityLevel);
  const riskLevel = calculateRiskLevel(bmi, age, conditions);
  
  return {
    bmi,
    bmr,
    bodyFatPercentage,
    dailyCalorieNeeds,
    riskLevel,
  };
}

/**
 * Get BMI category description
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

/**
 * Calculate target calorie adjustment for weight goals
 */
export function calculateTargetCalories(
  dailyCalorieNeeds: number,
  currentWeight: number,
  targetWeight: number,
  timeframeWeeks: number
): number {
  const weightDifference = targetWeight - currentWeight;
  const totalCalorieDeficitSurplus = weightDifference * 7700; // 1kg = 7700 calories
  const dailyCalorieAdjustment = totalCalorieDeficitSurplus / (timeframeWeeks * 7);
  
  return Math.round(dailyCalorieNeeds + dailyCalorieAdjustment);
}