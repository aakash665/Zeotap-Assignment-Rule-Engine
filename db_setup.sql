CREATE DATABASE rules_db;

USE rules_db;

CREATE TABLE rules (
    id INT NOT NULL AUTO_INCREMENT,
    rule_text TEXT NOT NULL,
    PRIMARY KEY (id)
);



INSERT INTO rules (rule_text) VALUES 
('GPA >= 3.0 AND creditHours >= 120'),
('investmentAmount >= 1500 AND priceChangePercentage >= 10'),
('debtToIncomeRatio <= 35 AND annualSavings >= 3000'),
('securityScore >= 80 AND responseTime <= 20'),
('creditScore >= 700 AND requestedLoanAmount <= 40000'),
('fundingAmount >= 50000 AND sampleSize >= 50'),
('age >= 25 AND age <= 40'),
('loanTermYears <= 15 AND interestRate <= 4.5'),
('educationLevel >= 4 AND yearsOfExperience >= 5'),
('monthlyExpenses <= 2000 AND income >= 5000'),
('projectRisk <= 30 AND impactScore <= 40'),
('hoursWorked >= 40 AND overtimeHours <= 10'),
('cyberThreatsDetected <= 5 AND securityTrainingHours >= 5'),
('clientSatisfactionScore >= 90 AND serviceResponseTime <= 15'),
('(educationLevel >= 4 AND yearsOfExperience >= 5) AND (monthlyExpenses <= 2000 AND income >= 5000)'),
('(monthlyExpenses <= 2000 AND income >= 5000) AND (projectRisk <= 30 AND impactScore <= 40)'),
('(debtToIncomeRatio <= 35 AND annualSavings >= 3000) AND (securityScore >= 80 AND responseTime <= 20)'),
('securityScore >= 80 AND responseTime <= 20'),
('debtToIncomeRatio <= 35 AND annualSavings >= 3000');

