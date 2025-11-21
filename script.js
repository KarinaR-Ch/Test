// Store the gift budget from step 1
let giftBudgetValue = 0;
let wishItemCount = 1;

// Store wishlist data
let wishlistData = [];

// Store personal info data
let personalInfoData = {};

// List of players from Who's Playing section (excluding current user and admin)
const playersList = [
    "Kostiantyna Nechyporenko",
    "Mykyta Slivchuk",
    "Kateryna Moravska",
    "Ivan Moldvinenko",
    "Serhii Kovalenko",
    "Valeria Solominka",
    "Veronica Andriyenko",
    "Ivan Kolodii"
];

// Variables for delete confirmation modal
let currentDeletePlayerRow = null;
let currentDeletePlayerName = '';

// Global variable to track admin status
let isAdmin = false;

// Function to show Look Who You Got card after 5 seconds
function showLookWhoCard() {
    setTimeout(function() {
        // Select a random player from the list
        const randomIndex = Math.floor(Math.random() * playersList.length);
        const assignedName = playersList[randomIndex];
        
        // Update the name in the card
        document.getElementById('look-who-name').textContent = assignedName;
        
        // Show the card
        document.getElementById('look-who-card').style.display = 'block';
    }, 5000);
}

// Look Who You Got button handler
document.getElementById('look-who-btn').addEventListener('click', function() {
    // Get the assigned person's name
    const assignedName = document.getElementById('look-who-name').textContent;
    
    // Update the look who page with the assigned person's name
    document.getElementById('look-who-first-name').textContent = assignedName.split(' ')[0];
    document.getElementById('look-who-last-name').textContent = assignedName.split(' ')[1];
    
    // Hide current pages and show look who page
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'none';
    document.getElementById('wishlist-page').style.display = 'none';
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('look-who-page').style.display = 'block';
    
    // Update URL
    history.pushState(null, null, '#look-who');
});

// Back button handler from look who page
document.getElementById('back-to-participant-from-look-who').addEventListener('click', function() {
    // Hide look who page and show participant page
    document.getElementById('look-who-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'block';
    
    // Update URL
    history.pushState(null, null, '#participant');
    
    // Show Look Who You Got card after 5 seconds
    showLookWhoCard();
});

// Admin toggle functionality
document.getElementById('admin-toggle').addEventListener('click', function() {
    const adminToggleCircle = document.getElementById('admin-toggle-circle');
    const adminPasswordSection = document.getElementById('admin-password-section');
    
    if (adminToggleCircle.classList.contains('active')) {
        adminToggleCircle.classList.remove('active');
        adminPasswordSection.classList.remove('active');
    } else {
        adminToggleCircle.classList.add('active');
        adminPasswordSection.classList.add('active');
    }
});

// Admin password submit functionality
document.getElementById('admin-password-btn').addEventListener('click', function() {
    const adminPassword = document.getElementById('admin-password').value;
    const adminPasswordError = document.getElementById('admin-password-error');
    
    if (adminPassword === '1111') {
        // Password is correct - navigate to participant page as admin
        isAdmin = true;
        transferDataToParticipantPage();
        navigateToParticipantPageAsAdmin();
    } else {
        // Password is incorrect - show error
        adminPasswordError.style.display = 'block';
    }
});

// Function to transfer data to participant page
function transferDataToParticipantPage() {
    // Transfer data to participant page
    const firstName = document.getElementById('first-name').value || 'Maria';
    const lastName = document.getElementById('last-name').value || 'Shevchenko';
    const exchangeDate = document.getElementById('exchange-date').value;
    const giftBudget = document.getElementById('gift-budget').value || '1000';
    const personalLink = document.getElementById('personal-link').value;
    
    // Format date for display
    let displayDate = '06 Dec 2025';
    if (exchangeDate) {
        const dateObj = new Date(exchangeDate);
        displayDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    
    // Update participant page with data
    document.getElementById('participant-name').textContent = firstName;
    document.getElementById('participant-exchange-date').textContent = displayDate;
    document.getElementById('participant-gift-budget').textContent = giftBudget + ' UAH';
    document.getElementById('participant-personal-link').value = personalLink;
    
    // Update participant wishlist with collected data
    updateParticipantWishlist();
    
    // Update Who's Playing section for admin
    updateWhosPlayingForAdmin(firstName + ' ' + lastName);
}

// Function to update Who's Playing section for admin (remove "Admin" label from Anastasiia Petrenko)
function updateWhosPlayingForAdmin(fullName) {
    const currentUserRow = document.getElementById('current-user-row');
    // Remove "You" label and keep only "Admin"
    currentUserRow.innerHTML = `${fullName} <span class="admin-label">Admin</span>`;
    
    // Remove "Admin" label from Anastasiia Petrenko
    const playersRows = document.querySelectorAll('.player-row');
    playersRows[0].innerHTML = 'Anastasiia Petrenko';
    
    // Show delete buttons for admin
    document.querySelectorAll('.admin-only').forEach(btn => {
        btn.style.display = 'block';
    });
}

// Function to navigate to participant page as admin
function navigateToParticipantPageAsAdmin() {
    // Hide current pages and show participant page
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'block';
    document.getElementById('wishlist-page').style.display = 'none';
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('look-who-page').style.display = 'none';
    
    // Update URL
    history.pushState(null, null, '#participant');
    
    // Hide Look Who You Got card and show Draw Names card for admin
    document.getElementById('look-who-card').style.display = 'none';
    document.getElementById('draw-names-card').style.display = 'block';
}

// Function to navigate to participant page as regular user
function navigateToParticipantPageAsUser() {
    // Hide current pages and show participant page
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'block';
    document.getElementById('wishlist-page').style.display = 'none';
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('look-who-page').style.display = 'none';
    
    // Update URL
    history.pushState(null, null, '#participant');
    
    // Show Look Who You Got card after 5 seconds for regular user
    showLookWhoCard();
    
    // Ensure Draw Names card is hidden for regular user
    document.getElementById('draw-names-card').style.display = 'none';
    
    // Hide delete buttons for regular user
    document.querySelectorAll('.admin-only').forEach(btn => {
        btn.style.display = 'none';
    });
}

// Draw Names button handler
document.getElementById('draw-names-btn').addEventListener('click', function() {
    // Select a random player from the list
    const randomIndex = Math.floor(Math.random() * playersList.length);
    const assignedName = playersList[randomIndex];
    
    // Update the name in the Look Who You Got card
    document.getElementById('look-who-name').textContent = assignedName;
    
    // Hide the Draw Names card and show the Look Who You Got card
    document.getElementById('draw-names-card').style.display = 'none';
    document.getElementById('look-who-card').style.display = 'block';
});

// Delete player functionality with confirmation modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn') && isAdmin) {
        currentDeletePlayerRow = e.target.closest('.player-row');
        currentDeletePlayerName = currentDeletePlayerRow.getAttribute('data-player');
        
        // Show confirmation modal
        document.getElementById('delete-modal').style.display = 'flex';
    }
});

// Delete confirmation modal buttons
document.getElementById('delete-yes-btn').addEventListener('click', function() {
    // Remove the player row
    if (currentDeletePlayerRow) {
        currentDeletePlayerRow.remove();
        // Update players count
        updatePlayersCount();
    }
    
    // Close the modal
    document.getElementById('delete-modal').style.display = 'none';
});

document.getElementById('delete-no-btn').addEventListener('click', function() {
    // Close the modal without deleting
    document.getElementById('delete-modal').style.display = 'none';
});

// Function to update players count
function updatePlayersCount() {
    const playerRows = document.querySelectorAll('.player-row');
    const countElement = document.getElementById('players-count');
    if (countElement) {
        countElement.textContent = `${playerRows.length}/20`;
    }
}

document.getElementById('create-room-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Hide landing page
    document.getElementById('landing').style.display = 'none';
    
    // Show app page
    document.getElementById('app-page').style.display = 'block';
    
    // Update URL without reloading page
    history.pushState(null, null, '#app');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    if (window.location.hash === '#app') {
        document.getElementById('landing').style.display = 'none';
        document.getElementById('app-page').style.display = 'block';
        document.getElementById('participant-page').style.display = 'none';
        document.getElementById('wishlist-page').style.display = 'none';
        document.getElementById('personal-info-page').style.display = 'none';
        document.getElementById('look-who-page').style.display = 'none';
    } else if (window.location.hash === '#participant') {
        document.getElementById('landing').style.display = 'none';
        document.getElementById('app-page').style.display = 'none';
        document.getElementById('participant-page').style.display = 'block';
        document.getElementById('wishlist-page').style.display = 'none';
        document.getElementById('personal-info-page').style.display = 'none';
        document.getElementById('look-who-page').style.display = 'none';
        // Show Look Who You Got card after 5 seconds on participant page for regular users
        showLookWhoCard();
    } else if (window.location.hash === '#wishlist') {
        document.getElementById('landing').style.display = 'none';
        document.getElementById('app-page').style.display = 'none';
        document.getElementById('participant-page').style.display = 'none';
        document.getElementById('wishlist-page').style.display = 'block';
        document.getElementById('personal-info-page').style.display = 'none';
        document.getElementById('look-who-page').style.display = 'none';
    } else if (window.location.hash === '#personal-info') {
        document.getElementById('landing').style.display = 'none';
        document.getElementById('app-page').style.display = 'none';
        document.getElementById('participant-page').style.display = 'none';
        document.getElementById('wishlist-page').style.display = 'none';
        document.getElementById('personal-info-page').style.display = 'block';
        document.getElementById('look-who-page').style.display = 'none';
    } else if (window.location.hash === '#look-who') {
        document.getElementById('landing').style.display = 'none';
        document.getElementById('app-page').style.display = 'none';
        document.getElementById('participant-page').style.display = 'none';
        document.getElementById('wishlist-page').style.display = 'none';
        document.getElementById('personal-info-page').style.display = 'none';
        document.getElementById('look-who-page').style.display = 'block';
    } else {
        document.getElementById('landing').style.display = 'block';
        document.getElementById('app-page').style.display = 'none';
        document.getElementById('participant-page').style.display = 'none';
        document.getElementById('wishlist-page').style.display = 'none';
        document.getElementById('personal-info-page').style.display = 'none';
        document.getElementById('look-who-page').style.display = 'none';
    }
});

// Check URL on page load
if (window.location.hash === '#app') {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'block';
} else if (window.location.hash === '#participant') {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'block';
    // Show Look Who You Got card after 5 seconds on participant page
    showLookWhoCard();
} else if (window.location.hash === '#wishlist') {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'none';
    document.getElementById('wishlist-page').style.display = 'block';
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('look-who-page').style.display = 'none';
} else if (window.location.hash === '#personal-info') {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'none';
    document.getElementById('wishlist-page').style.display = 'none';
    document.getElementById('personal-info-page').style.display = 'block';
    document.getElementById('look-who-page').style.display = 'none';
} else if (window.location.hash === '#look-who') {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'none';
    document.getElementById('wishlist-page').style.display = 'none';
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('look-who-page').style.display = 'block';
}

// Form validation and button activation for step 1
const roomNameInput = document.getElementById('room-name');
const roomDescriptionInput = document.getElementById('room-description');
const exchangeDateInput = document.getElementById('exchange-date');
const giftBudgetInput = document.getElementById('gift-budget');
const continueBtn = document.getElementById('continue-btn');

function checkFormValidity() {
    const isRoomNameFilled = roomNameInput.value.trim() !== '';
    const isRoomDescriptionFilled = roomDescriptionInput.value.trim() !== '';
    const isExchangeDateFilled = exchangeDateInput.value !== '';
    const isGiftBudgetFilled = giftBudgetInput.value !== '';
    
    if (isRoomNameFilled && isRoomDescriptionFilled && isExchangeDateFilled && isGiftBudgetFilled) {
        continueBtn.classList.add('active');
    } else {
        continueBtn.classList.remove('active');
    }
}

// Add event listeners to all form inputs for step 1
roomNameInput.addEventListener('input', checkFormValidity);
roomDescriptionInput.addEventListener('input', checkFormValidity);
exchangeDateInput.addEventListener('input', checkFormValidity);
giftBudgetInput.addEventListener('input', checkFormValidity);

// Continue button click handler for step 1
continueBtn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        // Store the gift budget value
        giftBudgetValue = giftBudgetInput.value;
        
        // Hide step 1 content
        document.getElementById('step1-content').style.display = 'none';
        
        // Show step 2 content
        document.getElementById('step2-content').style.display = 'block';
        
        // Update progress steps
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    }
});

// Form validation for step 2
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const continueBtnStep2 = document.getElementById('continue-btn-step2');

function checkStep2FormValidity() {
    const isFirstNameFilled = firstNameInput.value.trim() !== '';
    const isLastNameFilled = lastNameInput.value.trim() !== '';
    const isPhoneFilled = phoneInput.value.trim() !== '';
    const isAddressFilled = addressInput.value.trim() !== '';
    
    if (isFirstNameFilled && isLastNameFilled && isPhoneFilled && isAddressFilled) {
        continueBtnStep2.classList.add('active');
    } else {
        continueBtnStep2.classList.remove('active');
    }
}

// Add event listeners for step 2 inputs
firstNameInput.addEventListener('input', checkStep2FormValidity);
lastNameInput.addEventListener('input', checkStep2FormValidity);
phoneInput.addEventListener('input', checkStep2FormValidity);
addressInput.addEventListener('input', checkStep2FormValidity);

// Continue button handler for step 2
continueBtnStep2.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        // Update gift budget display
        const budgetDisplay = giftBudgetValue === '0' ? 'Unlimited' : giftBudgetValue + ' UAH';
        document.getElementById('gift-budget-display').innerHTML = `
            <img src="https://raw.githubusercontent.com/KarinaR-Ch/MarathonEpam/refs/heads/main/src/loading%20page/presents.png" class="gift-budget-icon">
            Gift Budget: <strong>${budgetDisplay}</strong>
        `;
        
        // Hide step 2 content
        document.getElementById('step2-content').style.display = 'none';
        
        // Show step 3 content
        document.getElementById('step3-content').style.display = 'block';
        
        // Update progress steps
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
    }
});

// Add Wish functionality
document.getElementById('add-wish-btn').addEventListener('click', function() {
    if (wishItemCount < 5) {
        wishItemCount++;
        const newWishItem = document.createElement('div');
        newWishItem.className = 'wish-item';
        newWishItem.id = 'wish-item-' + wishItemCount;
        newWishItem.innerHTML = `
            <div class="row">
                <div class="half">
                    <label>I wish for *</label>
                    <input type="text" class="input wish-item-input" placeholder="Enter your wish name" maxlength="40">
                    <div class="count">0 / 40</div>
                </div>
                <div class="half">
                    <label>Add link</label>
                    <input type="url" class="input wish-link-input" placeholder="E.g. https://example.com/item">
                </div>
            </div>
        `;
        document.getElementById('wish-items-container').appendChild(newWishItem);
        
        // Add character count functionality to new input
        const newInput = newWishItem.querySelector('.wish-item-input');
        const newCount = newWishItem.querySelector('.count');
        newInput.addEventListener('input', function() {
            newCount.textContent = this.value.length + ' / 40';
        });
        
        // Add validation listener
        newInput.addEventListener('input', checkStep3FormValidity);
        
        // Disable button if reached max
        if (wishItemCount >= 5) {
            this.disabled = true;
        }
    }
});

// Character count for first wish item
document.querySelector('.wish-item-input').addEventListener('input', function() {
    const countElement = this.parentElement.querySelector('.count');
    countElement.textContent = this.value.length + ' / 40';
});

// Form validation for step 3
const completeBtn = document.getElementById('complete-btn');

function checkStep3FormValidity() {
    const isWishIdeasSelected = document.getElementById('wish-ideas').checked;
    const isSurpriseSelected = document.getElementById('surprise-gift').checked;
    
    if (isSurpriseSelected) {
        completeBtn.classList.add('active');
        return;
    }
    
    if (isWishIdeasSelected) {
        // Check if at least one wish item is filled
        const wishInputs = document.querySelectorAll('.wish-item-input');
        let hasFilledWish = false;
        wishInputs.forEach(input => {
            if (input.value.trim() !== '') {
                hasFilledWish = true;
            }
        });
        
        if (hasFilledWish) {
            completeBtn.classList.add('active');
        } else {
            completeBtn.classList.remove('active');
        }
    } else {
        completeBtn.classList.remove('active');
    }
}

// Add event listeners for step 3 inputs
document.querySelector('.wish-item-input').addEventListener('input', checkStep3FormValidity);
document.getElementById('wish-ideas').addEventListener('change', checkStep3FormValidity);
document.getElementById('surprise-gift').addEventListener('change', checkStep3FormValidity);

// Function to collect wishlist data
function collectWishlistData() {
    wishlistData = [];
    const wishItems = document.querySelectorAll('.wish-item');
    
    wishItems.forEach((item, index) => {
        const wishName = item.querySelector('.wish-item-input').value.trim();
        const wishLink = item.querySelector('.wish-link-input').value.trim();
        
        if (wishName) {
            wishlistData.push({
                name: wishName,
                link: wishLink
            });
        }
    });
}

// Function to collect personal info data
function collectPersonalInfoData() {
    personalInfoData = {
        firstName: document.getElementById('first-name').value || 'Anastasiia',
        lastName: document.getElementById('last-name').value || 'Petrenko',
        phone: document.getElementById('phone').value ? '+38 0' + document.getElementById('phone').value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4') : '+38 099 876 54 32',
        email: document.getElementById('email').value || 'anastasiiapetrenko@gmail.com',
        address: document.getElementById('address').value || 'Kyiv, NP #212'
    };
}

// Function to update participant wishlist
function updateParticipantWishlist() {
    const wishlistContainer = document.getElementById('participant-wishlist-container');
    wishlistContainer.innerHTML = '';
    
    if (wishlistData.length === 0) {
        wishlistContainer.innerHTML = '<div class="wish-row">No wishes added yet</div>';
        return;
    }
    
    wishlistData.forEach((wish, index) => {
        const wishRow = document.createElement('div');
        wishRow.className = 'wish-row';
        const displayName = wish.name.length > 30 ? wish.name.substring(0, 30) + '...' : wish.name;
        wishRow.innerHTML = `
            ${displayName}
            <span class="wish-link" data-link="${wish.link}" data-index="${index}">Link</span>
        `;
        wishlistContainer.appendChild(wishRow);
    });
    
    // Add click event listeners to wish links
    document.querySelectorAll('.wish-link[data-link]').forEach(link => {
        link.addEventListener('click', function() {
            const wishLink = this.getAttribute('data-link');
            if (wishLink) {
                window.open(wishLink, '_blank');
            } else {
                alert('No link available for this wish');
            }
        });
    });
}

// Function to update personal info page
function updatePersonalInfoPage() {
    document.getElementById('info-first-name').textContent = personalInfoData.firstName;
    document.getElementById('info-last-name').textContent = personalInfoData.lastName;
    document.getElementById('info-phone').textContent = personalInfoData.phone;
    document.getElementById('info-email').textContent = personalInfoData.email;
    document.getElementById('info-address').textContent = personalInfoData.address;
}

// Function to update wishlist page
function updateWishlistPage() {
    const wishlistPageContainer = document.getElementById('wishlist-page-items');
    wishlistPageContainer.innerHTML = '';
    
    if (wishlistData.length === 0) {
        wishlistPageContainer.innerHTML = '<div class="wishlist-item"><h3>No wishes added yet</h3></div>';
        return;
    }
    
    wishlistData.forEach((wish, index) => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <h3>${wish.name}</h3>
            ${wish.link ? `<a href="${wish.link}" target="_blank" class="wishlist-item-link">View Product Link</a>` : '<p>No link provided</p>'}
        `;
        wishlistPageContainer.appendChild(wishlistItem);
    });
}

// Function to update current user name in Who's Playing section
function updateCurrentUserName() {
    const firstName = document.getElementById('first-name').value || 'Maria';
    const lastName = document.getElementById('last-name').value || 'Shevchenko';
    const currentUserRow = document.getElementById('current-user-row');
    currentUserRow.innerHTML = `${firstName} ${lastName} <span class="you-label">You</span>`;
    document.getElementById('participant-name').textContent = firstName;
}

// Complete button handler for step 3
completeBtn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        // Collect wishlist data
        collectWishlistData();
        
        // Collect personal info data
        collectPersonalInfoData();
        
        // Update current user name
        updateCurrentUserName();
        
        // Generate unique room code
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const personalCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        
        // Update links with generated codes
        document.getElementById('room-link').value = `https://secretnickswap.com/join/${roomCode}`;
        document.getElementById('personal-link').value = `https://secretnickswap.com/join/${personalCode}`;
        
        // Update invitation note with actual room link
        const noteBox = document.querySelector('.note-box');
        noteBox.innerHTML = noteBox.innerHTML.replace('abc123', roomCode);
        
        // Hide step 3 content
        document.getElementById('step3-content').style.display = 'none';
        
        // Show step 4 content
        document.getElementById('step4-content').style.display = 'block';
        
        // Hide progress steps on step 4
        document.getElementById('progress-steps').style.display = 'none';
    }
});

// Visit Room button handler - opens participant page
document.getElementById('visit-room-btn').addEventListener('click', function() {
    transferDataToParticipantPage();
    navigateToParticipantPageAsUser();
});

// View Information button handler - opens personal info page
document.getElementById('view-info-btn').addEventListener('click', function() {
    // Update personal info page with collected data
    updatePersonalInfoPage();
    
    // Hide current pages and show personal info page
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'none';
    document.getElementById('wishlist-page').style.display = 'none';
    document.getElementById('personal-info-page').style.display = 'block';
    document.getElementById('look-who-page').style.display = 'none';
    
    // Update URL
    history.pushState(null, null, '#personal-info');
});

// View Wishlist button handler - opens wishlist page
document.getElementById('view-wishlist-btn').addEventListener('click', function() {
    // Update wishlist page with collected data
    updateWishlistPage();
    
    // Hide current pages and show wishlist page
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'none';
    document.getElementById('wishlist-page').style.display = 'block';
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('look-who-page').style.display = 'none';
    
    // Update URL
    history.pushState(null, null, '#wishlist');
});

// Back to Participant button handler from wishlist
document.getElementById('back-to-participant-btn').addEventListener('click', function() {
    // Hide wishlist page and show participant page
    document.getElementById('wishlist-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'block';
    
    // Update URL
    history.pushState(null, null, '#participant');
    
    // Show Look Who You Got card after 5 seconds
    showLookWhoCard();
});

// Close button handler for personal info page
document.getElementById('close-info-btn').addEventListener('click', function() {
    // Hide personal info page and show participant page
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('participant-page').style.display = 'block';
    
    // Update URL
    history.pushState(null, null, '#participant');
    
    // Show Look Who You Got card after 5 seconds
    showLookWhoCard();
});

// Copy button functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.copy-btn')) {
        const copyBtn = e.target.closest('.copy-btn');
        const targetId = copyBtn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        // Select the text
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the text
        navigator.clipboard.writeText(input.value).then(function() {
            // Show success feedback
            const originalHTML = copyBtn.innerHTML;
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2C5134">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span class="copy-tooltip">Copy to clipboard</span>
            `;
            
            // Reset after 2 seconds
            setTimeout(function() {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            try {
                document.execCommand('copy');
                const originalHTML = copyBtn.innerHTML;
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2C5134">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span class="copy-tooltip">Copy to clipboard</span>
                `;
                setTimeout(function() {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = originalHTML;
                }, 2000);
            } catch (fallbackErr) {
                console.error('Fallback copy failed: ', fallbackErr);
                alert('Failed to copy text to clipboard');
            }
        });
    }
});

// Back button handlers
document.getElementById('back-link-step2').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Hide step 2 content
    document.getElementById('step2-content').style.display = 'none';
    
    // Show step 1 content
    document.getElementById('step1-content').style.display = 'block';
    
    // Update progress steps
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
});

document.getElementById('back-link-step3').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Hide step 3 content
    document.getElementById('step3-content').style.display = 'none';
    
    // Show step 2 content
    document.getElementById('step2-content').style.display = 'block';
    
    // Update progress steps
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step2').classList.add('active');
});
