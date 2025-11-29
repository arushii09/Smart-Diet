// Upload Modal Functionality
const photoBtn = document.getElementById('photo-btn');
const uploadModal = document.getElementById('upload-modal');
const closeModal = document.getElementById('close-modal');
const cancelUpload = document.getElementById('cancel-upload');
const uploadArea = document.getElementById('upload-area');

photoBtn.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

cancelUpload.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

uploadArea.addEventListener('click', () => {
    // In a real app, this would trigger a file input
    alert('File upload dialog would open here in a real application');
});

// Like button functionality
const likeButtons = document.querySelectorAll('.post-action');
likeButtons.forEach(button => {
    if (button.querySelector('.fa-heart')) {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if(icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
                
                // Update like count
                const postStats = this.closest('.post').querySelector('.post-stats');
                const likeStat = postStats.querySelector('.post-stat:first-child');
                const currentLikes = parseInt(likeStat.textContent);
                likeStat.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes + 1}`;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
                
                // Update like count
                const postStats = this.closest('.post').querySelector('.post-stats');
                const likeStat = postStats.querySelector('.post-stat:first-child');
                const currentLikes = parseInt(likeStat.textContent);
                likeStat.innerHTML = `<i class="far fa-heart"></i> ${currentLikes - 1}`;
            }
        });
    }
});

// Join challenge buttons
const joinButtons = document.querySelectorAll('.join-btn');
joinButtons.forEach(button => {
    button.addEventListener('click', function() {
        if(this.textContent === 'Join') {
            this.textContent = 'Joined';
            this.style.backgroundColor = '#757575';
            
            // Update participant count
            const challengeInfo = this.closest('.challenge').querySelector('.challenge-info p');
            const currentParticipants = parseInt(challengeInfo.textContent);
            challengeInfo.textContent = `${currentParticipants + 1} participants`;
        } else {
            this.textContent = 'Join';
            this.style.backgroundColor = '';
            
            // Update participant count
            const challengeInfo = this.closest('.challenge').querySelector('.challenge-info p');
            const currentParticipants = parseInt(challengeInfo.textContent);
            challengeInfo.textContent = `${currentParticipants - 1} participants`;
        }
    });
});

// Post submission
const postBtn = document.querySelector('.post-btn');
const postTextarea = document.querySelector('.post-input-field textarea');

postBtn.addEventListener('click', () => {
    const postContent = postTextarea.value.trim();
    if (postContent) {
        // In a real app, this would send the post to a server
        alert('Post shared successfully!');
        postTextarea.value = '';
    } else {
        alert('Please write something to share!');
    }
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
            
        }
    }
});

// Edit profile button
const editProfileBtn = document.querySelector('.edit-profile-btn');
editProfileBtn.addEventListener('click', () => {
    alert('Edit profile feature would open here');
});

// Modal form submission
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', () => {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const tags = document.getElementById('post-tags').value.trim();
    
    if (title && content) {
        alert('Post created successfully!');
        uploadModal.style.display = 'none';
        // Reset form
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        document.getElementById('post-tags').value = '';
    } else {
        alert('Please fill in at least title and content');
    }
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        uploadModal.style.display = 'none';
    }
});

// Trending topics click
const topics = document.querySelectorAll('.topic');
topics.forEach(topic => {
    topic.addEventListener('click', () => {
        const topicName = topic.querySelector('.topic-name').textContent;
        alert(`Showing posts about: ${topicName}`);
        // In a real app, this would filter the feed
    });
});

// Event click
const events = document.querySelectorAll('.event');
events.forEach(event => {
    event.addEventListener('click', () => {
        const eventName = event.querySelector('h4').textContent;
        alert(`Joining event: ${eventName}`);
        // In a real app, this would register for the event
    });
});