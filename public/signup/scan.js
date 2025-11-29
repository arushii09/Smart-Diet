// Food Safety AI Analysis System
class FoodSafetyAnalyzer {
    constructor() {
        this.initializeEventListeners();
        this.initializeDragAndDrop();
    }

    initializeEventListeners() {
        // Lookup by barcode
        document.getElementById('lookupBtn').addEventListener('click', () => {
            this.handleBarcodeLookup();
        });

        // Analyze by manual input
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.handleManualAnalysis();
        });

        // Enter key support for barcode input
        document.getElementById('barcodeInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleBarcodeLookup();
            }
        });

        // File input change
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });
    }

    initializeDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });
    }

    async handleBarcodeLookup() {
        const barcode = document.getElementById('barcodeInput').value.trim();
        
        if (!barcode) {
            this.showError('Please enter a barcode');
            return;
        }

        if (!/^\d+$/.test(barcode)) {
            this.showError('Please enter a valid numeric barcode');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate API call to OpenFoodFacts
            const productData = await this.fetchProductData(barcode);
            await this.analyzeProductSafety(productData);
        } catch (error) {
            this.showError('Failed to fetch product data. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async handleManualAnalysis() {
        const productName = document.getElementById('productName').value.trim();
        const productBrand = document.getElementById('productBrand').value.trim();
        const ingredients = document.getElementById('ingredients').value.trim();

        if (!productName || !ingredients) {
            this.showError('Please enter at least product name and ingredients');
            return;
        }

        const productData = {
            name: productName,
            brand: productBrand,
            ingredients: ingredients,
            barcode: 'MANUAL_INPUT'
        };

        this.showLoading();
        
        try {
            await this.analyzeProductSafety(productData);
        } catch (error) {
            this.showError('Analysis failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async handleFileUpload(file) {
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            this.showError('Please upload a valid image file (JPG, PNG, WEBP)');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            this.showError('File size must be less than 5MB');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate image processing and barcode detection
            const barcode = await this.processImageForBarcode(file);
            if (barcode) {
                const productData = await this.fetchProductData(barcode);
                await this.analyzeProductSafety(productData);
            } else {
                this.showError('Could not detect barcode in the image. Please try another image or enter details manually.');
            }
        } catch (error) {
            this.showError('Failed to process image. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    // Simulated API calls and processing
    async fetchProductData(barcode) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock product data - in real implementation, this would call OpenFoodFacts API
        const mockProducts = {
            '8901234567890': {
                name: 'Organic Whole Wheat Bread',
                brand: 'Nature\'s Best',
                ingredients: 'Whole wheat flour, water, honey, yeast, sea salt, sunflower oil',
                barcode: '8901234567890',
                image: 'https://via.placeholder.com/200x200?text=Bread'
            },
            '8901234567891': {
                name: 'Fruit Yogurt Drink',
                brand: 'FreshDaily',
                ingredients: 'Milk, sugar, strawberry puree, natural flavor, citric acid, potassium sorbate',
                barcode: '8901234567891',
                image: 'https://via.placeholder.com/200x200?text=Yogurt'
            },
            '8901234567892': {
                name: 'Instant Noodles',
                brand: 'QuickMeal',
                ingredients: 'Wheat flour, palm oil, salt, monosodium glutamate, artificial flavor, TBHQ',
                barcode: '8901234567892',
                image: 'https://via.placeholder.com/200x200?text=Noodles'
            }
        };

        return mockProducts[barcode] || {
            name: 'Product Not Found',
            brand: 'Unknown',
            ingredients: 'No ingredient data available',
            barcode: barcode,
            image: null
        };
    }

    async processImageForBarcode(file) {
        // Simulate image processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock barcode detection - in real implementation, use a barcode detection library
        const mockBarcodes = ['8901234567890', '8901234567891', '8901234567892'];
        return mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
    }

    async analyzeProductSafety(productData) {
        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const analysis = this.performSafetyAnalysis(productData);
        this.displayResults(productData, analysis);
        this.showResultsSection();
    }

    performSafetyAnalysis(productData) {
        const ingredients = productData.ingredients.toLowerCase();
        
        // AI Safety Analysis Logic
        const analysis = {
            overallScore: this.calculateOverallSafety(ingredients),
            ingredientSafety: this.analyzeIngredients(ingredients),
            additiveAnalysis: this.analyzeAdditives(ingredients),
            nutritionalQuality: this.analyzeNutritionalQuality(ingredients),
            allergenRisk: this.analyzeAllergenRisk(ingredients),
            recommendations: this.generateRecommendations(ingredients)
        };

        return analysis;
    }

    calculateOverallSafety(ingredients) {
        let score = 70; // Base score

        // Positive factors
        if (ingredients.includes('organic')) score += 10;
        if (ingredients.includes('whole') && ingredients.includes('wheat')) score += 8;
        if (ingredients.includes('natural')) score += 5;
        if (!ingredients.includes('artificial')) score += 5;

        // Negative factors
        if (ingredients.includes('monosodium glutamate') || ingredients.includes('msg')) score -= 15;
        if (ingredients.includes('high fructose corn syrup')) score -= 12;
        if (ingredients.includes('artificial flavor') || ingredients.includes('artificial color')) score -= 10;
        if (ingredients.includes('sodium nitrate')) score -= 8;
        if (ingredients.includes('tbhq') || ingredients.includes('bht')) score -= 8;
        if (ingredients.includes('hydrogenated')) score -= 10;

        // Ensure score is between 0-100
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    analyzeIngredients(ingredients) {
        const harmfulIngredients = [
            'monosodium glutamate', 'high fructose corn syrup', 'sodium nitrate',
            'tbhq', 'bht', 'bha', 'potassium bromate', 'azodicarbonamide'
        ];

        const foundHarmful = harmfulIngredients.filter(ing => ingredients.includes(ing));
        const score = Math.max(0, 100 - (foundHarmful.length * 20));

        return {
            score: score,
            analysis: foundHarmful.length > 0 
                ? `Contains ${foundHarmful.length} potentially harmful ingredient${foundHarmful.length > 1 ? 's' : ''}: ${foundHarmful.join(', ')}`
                : 'No harmful ingredients detected. Contains mostly natural components.',
            details: foundHarmful
        };
    }

    analyzeAdditives(ingredients) {
        const additives = {
            'preservatives': ['potassium sorbate', 'sodium benzoate', 'calcium propionate'],
            'artificial colors': ['red 40', 'yellow 5', 'blue 1', 'artificial color'],
            'artificial flavors': ['artificial flavor', 'natural flavor'],
            'sweeteners': ['aspartame', 'sucralose', 'saccharin'],
            'emulsifiers': ['soy lecithin', 'mono and diglycerides']
        };

        let additiveCount = 0;
        let foundAdditives = [];

        Object.entries(additives).forEach(([category, items]) => {
            items.forEach(additive => {
                if (ingredients.includes(additive)) {
                    additiveCount++;
                    foundAdditives.push(`${additive} (${category})`);
                }
            });
        });

        const score = Math.max(0, 100 - (additiveCount * 8));
        
        return {
            score: score,
            analysis: additiveCount > 0 
                ? `Contains ${additiveCount} food additive${additiveCount > 1 ? 's' : ''}`
                : 'Minimal or no artificial additives',
            details: foundAdditives
        };
    }

    analyzeNutritionalQuality(ingredients) {
        let score = 60;
        const positiveIndicators = ['whole grain', 'fiber', 'protein', 'vitamin', 'mineral', 'antioxidant'];
        const negativeIndicators = ['sugar', 'syrup', 'hydrogenated', 'shortening', 'refined'];

        positiveIndicators.forEach(indicator => {
            if (ingredients.includes(indicator)) score += 5;
        });

        negativeIndicators.forEach(indicator => {
            if (ingredients.includes(indicator)) score -= 8;
        });

        score = Math.max(0, Math.min(100, score));

        return {
            score: score,
            analysis: score >= 70 ? 'Good nutritional profile' : 
                     score >= 50 ? 'Average nutritional value' : 'Poor nutritional quality',
            details: []
        };
    }

    analyzeAllergenRisk(ingredients) {
        const commonAllergens = [
            'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts',
            'wheat', 'soy', 'gluten'
        ];

        const foundAllergens = commonAllergens.filter(allergen => ingredients.includes(allergen));
        const score = foundAllergens.length === 0 ? 100 : Math.max(20, 100 - (foundAllergens.length * 15));

        return {
            score: score,
            analysis: foundAllergens.length > 0 
                ? `Contains ${foundAllergens.length} common allergen${foundAllergens.length > 1 ? 's' : ''}`
                : 'No common allergens detected',
            details: foundAllergens
        };
    }

    generateRecommendations(ingredients) {
        const recommendations = [];

        if (ingredients.includes('monosodium glutamate')) {
            recommendations.push({
                type: 'warning',
                text: 'Contains MSG - may cause sensitivity in some individuals'
            });
        }

        if (ingredients.includes('high fructose corn syrup')) {
            recommendations.push({
                type: 'warning',
                text: 'Contains high fructose corn syrup - consider limiting consumption'
            });
        }

        if (ingredients.includes('hydrogenated')) {
            recommendations.push({
                type: 'danger',
                text: 'Contains trans fats - avoid for heart health'
            });
        }

        if (ingredients.includes('artificial flavor') || ingredients.includes('artificial color')) {
            recommendations.push({
                type: 'warning',
                text: 'Contains artificial additives - consider natural alternatives'
            });
        }

        if (ingredients.includes('whole grain') && ingredients.includes('fiber')) {
            recommendations.push({
                type: 'safe',
                text: 'Good source of whole grains and fiber - beneficial for digestive health'
            });
        }

        if (recommendations.length === 0) {
            recommendations.push({
                type: 'safe',
                text: 'Product appears to have reasonable ingredient quality'
            });
        }

        return recommendations;
    }

    displayResults(productData, analysis) {
        // Update product info
        document.getElementById('productNameDisplay').textContent = productData.name;
        document.getElementById('productBrandDisplay').textContent = productData.brand;
        document.getElementById('barcodeDisplay').textContent = productData.barcode;

        // Update safety rating
        this.updateSafetyRating(analysis.overallScore);

        // Update detailed analysis
        this.updateDetailedAnalysis(analysis);

        // Update recommendations
        this.updateRecommendations(analysis.recommendations);
    }

    updateSafetyRating(score) {
        const safetyBadge = document.getElementById('safetyBadge');
        const safetyScore = document.getElementById('safetyScore');
        const safetyText = document.getElementById('safetyText');
        const meterFill = document.getElementById('meterFill');

        safetyScore.textContent = score;
        meterFill.style.width = `${score}%`;

        // Remove existing classes
        safetyBadge.className = 'rating-badge';
        
        if (score >= 80) {
            safetyText.textContent = 'VERY SAFE';
            safetyBadge.classList.add('rating-safe');
        } else if (score >= 60) {
            safetyText.textContent = 'MODERATELY SAFE';
            safetyBadge.classList.add('rating-moderate');
        } else {
            safetyText.textContent = 'CAUTION ADVISED';
            safetyBadge.classList.add('rating-unsafe');
        }
    }

    updateDetailedAnalysis(analysis) {
        document.getElementById('ingredientScore').textContent = analysis.ingredientSafety.score;
        document.getElementById('ingredientAnalysis').textContent = analysis.ingredientSafety.analysis;

        document.getElementById('additiveScore').textContent = analysis.additiveAnalysis.score;
        document.getElementById('additiveAnalysis').textContent = analysis.additiveAnalysis.analysis;

        document.getElementById('nutritionScore').textContent = analysis.nutritionalQuality.score;
        document.getElementById('nutritionAnalysis').textContent = analysis.nutritionalQuality.analysis;

        document.getElementById('allergenScore').textContent = analysis.allergenRisk.score;
        document.getElementById('allergenAnalysis').textContent = analysis.allergenRisk.analysis;
    }

    updateRecommendations(recommendations) {
        const container = document.getElementById('recommendationList');
        container.innerHTML = '';

        recommendations.forEach(rec => {
            const item = document.createElement('div');
            item.className = `recommendation-item ${rec.type}`;
            
            let icon = '💡';
            if (rec.type === 'warning') icon = '⚠️';
            if (rec.type === 'danger') icon = '🚫';
            if (rec.type === 'safe') icon = '✅';

            item.innerHTML = `
                <span class="recommendation-icon">${icon}</span>
                <span class="recommendation-text">${rec.text}</span>
            `;
            
            container.appendChild(item);
        });
    }

    showResultsSection() {
        document.getElementById('resultsSection').style.display = 'block';
        // Smooth scroll to results
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }

    showError(message) {
        alert(message); // In production, use a better error display method
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FoodSafetyAnalyzer();
});

// Additional utility functions
function validateBarcode(barcode) {
    return /^\d{8,13}$/.test(barcode);
}

function formatIngredients(ingredientsText) {
    return ingredientsText.split(',').map(ing => ing.trim()).filter(ing => ing.length > 0);
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FoodSafetyAnalyzer;
}