// Nutritionist data
const nutritionists = {
    "emily-chen": {
        name: "Dr. Emily Chen",
        specialty: "Weight Loss & Diabetes Specialist",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 4.9,
        reviews: 124,
        location: "New York, NY",
        patients: "1,240+",
        experience: "10",
        success: "98%",
        price: 150,
        about: "Registered Dietitian with 10+ years of experience specializing in weight management and diabetes care. My approach focuses on sustainable lifestyle changes rather than restrictive diets. I believe in creating personalized plans that fit your lifestyle and preferences.",
        education: "• Ph.D. in Nutritional Sciences, Cornell University<br>• Registered Dietitian Nutritionist (RDN)<br>• Certified Diabetes Educator (CDE)<br>• Board Certified Specialist in Obesity and Weight Management",
        reviewsList: [
            {
                name: "Jennifer L.",
                date: "2 weeks ago",
                rating: 5,
                text: "Dr. Chen completely transformed my approach to food. I've lost 25 pounds in 4 months without feeling deprived. Her meal plans are practical and delicious!"
            },
            {
                name: "Michael T.",
                date: "1 month ago",
                rating: 5,
                text: "As a diabetic, I was struggling to manage my blood sugar. Dr. Chen's guidance has been life-changing. My A1C is now in the normal range for the first time in years."
            },
            {
                name: "Sarah K.",
                date: "3 months ago",
                rating: 4,
                text: "Very knowledgeable and supportive. The personalized approach made all the difference. I would highly recommend Dr. Chen to anyone looking to improve their health."
            }
        ]
    },
    "michael-rodriguez": {
        name: "Dr. Michael Rodriguez",
        specialty: "Sports Nutrition & Performance",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.7,
        reviews: 87,
        location: "Los Angeles, CA",
        patients: "850+",
        experience: "8",
        success: "95%",
        price: 180,
        about: "Certified Sports Nutritionist with a background in exercise physiology. I work with athletes of all levels to optimize performance through personalized nutrition strategies. My approach combines scientific principles with practical application.",
        education: "• M.S. in Exercise Physiology, University of Texas<br>• Certified Sports Nutritionist (CISSN)<br>• Registered Dietitian Nutritionist (RDN)<br>• Precision Nutrition Level 2 Certified",
        reviewsList: [
            {
                name: "David R.",
                date: "3 weeks ago",
                rating: 5,
                text: "Michael's nutrition plan took my marathon performance to the next level. I shaved 12 minutes off my personal best and recovered much faster."
            },
            {
                name: "Jessica M.",
                date: "2 months ago",
                rating: 5,
                text: "As a competitive weightlifter, I needed a nutritionist who understands the demands of strength sports. Michael's expertise in sports nutrition is exceptional."
            },
            {
                name: "Robert K.",
                date: "4 months ago",
                rating: 4,
                text: "Great knowledge of sports nutrition. Helped me optimize my diet for better performance and recovery. The meal timing strategies were particularly helpful."
            }
        ]
    },
    "sarah-johnson": {
        name: "Dr. Sarah Johnson",
        specialty: "Plant-Based & Holistic Nutrition",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        rating: 4.2,
        reviews: 42,
        location: "Portland, OR",
        patients: "520+",
        experience: "6",
        success: "92%",
        price: 120,
        about: "Holistic Nutritionist specializing in plant-based diets and integrative approaches to health. I believe in food as medicine and focus on whole-food, nutrient-dense eating patterns. My approach considers the whole person - body, mind, and environment.",
        education: "• M.S. in Holistic Nutrition, Bastyr University<br>• Certified Nutrition Specialist (CNS)<br>• Plant-Based Nutrition Certificate, Cornell University<br>• Integrative and Functional Nutrition Certified Practitioner",
        reviewsList: [
            {
                name: "Amanda P.",
                date: "1 month ago",
                rating: 5,
                text: "Sarah helped me transition to a plant-based diet smoothly. I have more energy, clearer skin, and feel amazing. Her recipes are delicious and easy to make."
            },
            {
                name: "Thomas W.",
                date: "2 months ago",
                rating: 4,
                text: "Sarah's holistic approach addressed not just my diet but also stress and sleep. I've seen improvements in my digestion and overall wellbeing."
            },
            {
                name: "Lisa M.",
                date: "3 months ago",
                rating: 4,
                text: "Very knowledgeable about plant-based nutrition. The meal plans are creative and satisfying. I've learned so much about nutrition and cooking."
            }
        ]
    }
};

// DOM Elements
const profileModal = document.getElementById('profile-modal');
const bookingModal = document.getElementById('booking-modal');
const closeProfileModal = document.getElementById('close-profile-modal');
const closeProfileBtn = document.getElementById('close-profile-btn');
const closeBookingBtn = document.getElementById('close-booking-btn');
const bookFromProfile = document.getElementById('book-from-profile');
const confirmBooking = document.getElementById('confirm-booking');
const viewProfileButtons = document.querySelectorAll('.view-profile-btn');
const bookNowButtons = document.querySelectorAll('.book-now-btn');

// Current selected nutritionist
let currentNutritionist = null;

// Open profile modal
viewProfileButtons.forEach(button => {
    button.addEventListener('click', function() {
        const nutritionistId = this.getAttribute('data-nutritionist');
        openProfileModal(nutritionistId);
    });
});

// Open booking modal
bookNowButtons.forEach(button => {
    button.addEventListener('click', function() {
        const nutritionistId = this.getAttribute('data-nutritionist');
        openBookingModal(nutritionistId);
    });
});

// Book from profile
bookFromProfile.addEventListener('click', function() {
    if (currentNutritionist) {
        profileModal.style.display = 'none';
        openBookingModal(currentNutritionist);
    }
});

// Close modals
closeProfileModal.addEventListener('click', closeModals);
closeProfileBtn.addEventListener('click', closeModals);
closeBookingBtn.addEventListener('click', closeModals);

// Confirm booking
confirmBooking.addEventListener('click', function() {
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const goals = document.getElementById('health-goals').value;
    
    if (!date || !time) {
        alert('Please select both date and time for your appointment.');
        return;
    }
    
    // In a real app, this would send the booking to a server
    alert(`Appointment booked with ${currentNutritionist ? nutritionists[currentNutritionist].name : 'nutritionist'}!\n\nDate: ${date}\nTime: ${time}\n\nWe'll contact you to confirm your appointment.`);
    closeModals();
    
    // Reset form
    document.getElementById('appointment-date').value = '';
    document.getElementById('appointment-time').value = '';
    document.getElementById('health-goals').value = '';
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === profileModal) {
        closeModals();
    }
    if (event.target === bookingModal) {
        closeModals();
    }
});

// Functions
function openProfileModal(nutritionistId) {
    const nutritionist = nutritionists[nutritionistId];
    if (!nutritionist) return;
    
    currentNutritionist = nutritionistId;
    
    // Populate modal with nutritionist data
    document.getElementById('modal-nutritionist-name').textContent = nutritionist.name;
    document.getElementById('modal-name').textContent = nutritionist.name;
    document.getElementById('modal-specialty').textContent = nutritionist.specialty;
    document.getElementById('modal-avatar').src = nutritionist.avatar;
    document.getElementById('modal-rating-value').textContent = nutritionist.rating;
    document.getElementById('modal-review-count').textContent = `(${nutritionist.reviews} reviews)`;
    document.getElementById('modal-location').textContent = nutritionist.location;
    document.getElementById('modal-patients').textContent = nutritionist.patients;
    document.getElementById('modal-experience').textContent = nutritionist.experience;
    document.getElementById('modal-success').textContent = nutritionist.success;
    document.getElementById('modal-about').innerHTML = nutritionist.about;
    document.getElementById('modal-education').innerHTML = nutritionist.education;
    
    // Update rating stars
    const ratingStars = document.getElementById('modal-rating');
    ratingStars.innerHTML = '';
    const fullStars = Math.floor(nutritionist.rating);
    const hasHalfStar = nutritionist.rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            ratingStars.innerHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            ratingStars.innerHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            ratingStars.innerHTML += '<i class="far fa-star"></i>';
        }
    }
    
    // Populate reviews
    const reviewsContainer = document.getElementById('modal-reviews');
    reviewsContainer.innerHTML = '';
    
    nutritionist.reviewsList.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < review.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="reviewer">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">${stars}</div>
            <div class="review-text">${review.text}</div>
        `;
        
        reviewsContainer.appendChild(reviewElement);
    });
    
    profileModal.style.display = 'flex';
}

function openBookingModal(nutritionistId) {
    const nutritionist = nutritionists[nutritionistId];
    if (!nutritionist) return;
    
    currentNutritionist = nutritionistId;
    
    // Populate booking modal
    document.getElementById('booking-nutritionist-name').textContent = `Book Appointment with ${nutritionist.name}`;
    document.getElementById('summary-name').textContent = nutritionist.name;
    document.getElementById('summary-specialty').textContent = nutritionist.specialty;
    document.getElementById('summary-rate').textContent = `$${nutritionist.price} / session`;
    document.getElementById('summary-total').textContent = `$${nutritionist.price}`;
    
    bookingModal.style.display = 'flex';
}

function closeModals() {
    profileModal.style.display = 'none';
    bookingModal.style.display = 'none';
    currentNutritionist = null;
}

// Set minimum date to today for appointment booking
const today = new Date().toISOString().split('T')[0];
document.getElementById('appointment-date').setAttribute('min', today);

// Search functionality
const searchInput = document.querySelector('.search-input input');
const searchButton = document.querySelector('.search-btn');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // In a real app, this would filter the nutritionist listings
    }
}

// Filter functionality
const filterOptions = document.querySelectorAll('.filter-option input');
filterOptions.forEach(option => {
    option.addEventListener('change', function() {
        // In a real app, this would filter the nutritionist listings
        console.log(`Filter changed: ${this.id}`);
    });
});

// Rating filter functionality
const ratingOptions = document.querySelectorAll('.rating-option');
ratingOptions.forEach(option => {
    option.addEventListener('click', function() {
        // In a real app, this would filter by rating
        const stars = this.querySelectorAll('.fa-star').length;
        const halfStar = this.querySelector('.fa-star-half-alt');
        const rating = halfStar ? stars - 0.5 : stars;
        console.log(`Filter by rating: ${rating}+ stars`);
    });
});

// Price filter functionality
const priceFilterButton = document.querySelector('.price-range .search-btn');
priceFilterButton.addEventListener('click', function() {
    const minPrice = document.querySelector('.price-inputs input:first-child').value;
    const maxPrice = document.querySelector('.price-inputs input:last-child').value;
    
    if (minPrice && maxPrice) {
        console.log(`Filter by price: $${minPrice} - $${maxPrice}`);
        // In a real app, this would filter the nutritionist listings
    }
});

// Sort functionality
const sortSelect = document.querySelector('.sort-options select');
sortSelect.addEventListener('change', function() {
    console.log(`Sort by: ${this.value}`);
    // In a real app, this would sort the nutritionist listings
});