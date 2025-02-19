fetch('./event.json')
    .then(response => response.json())
    .then(data => {
        const events = data.events;
        if (events && events.length > 0) {
            generateCards(events);
        } else {
            console.error("Aucun événement trouvé dans le fichier JSON.");
        }
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

// Fonction pour générer les cartes d'événements
function generateCards(events) {
    const container = document.getElementById('events-container');
    
    if (!events || events.length === 0) {
        container.innerHTML = "<p>Aucun événement trouvé.</p>";
        return;
    }

    events.forEach(event => {
        const card = document.createElement('a');
        card.href = `detail.html?id=${event.id}`;
        card.classList.add(
            'relative', 
            'flex',
            'flex-col', 
            'my-6', 
            'bg-white', 
            'shadow-sm', 
            'border', 
            'border-slate-200', 
            'rounded-lg', 
            'w-96',
            'min-w-[384px]'
        );

        card.innerHTML = `
            <div class="relative h-80 m-2.5 overflow-hidden text-white rounded-md full" id="card-image">
                <img src="${event.image_url}" alt="card-image"/>
            </div>
            <div class="p-4">
                <div class="flex items-center justify-between w-full">
                    <div class="rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                        ${event.event_type}
                    </div>
                    <span class="ml-2 text-slate-800 font-semibold">
                        <i class="fas fa-map-marker-alt mr-1"></i> ${event.city}
                    </span>
                </div>
                
                <h6 class="mt-4 mb-2 text-slate-800 text-xl font-semibold">
                    ${event.title}
                </h6>
                <p class="text-slate-600 leading-normal font-light">
                    ${event.description}
                </p>
            </div>

            <div class="flex items-center justify-between p-4">
                <div class="flex items-center">
                    <img
                        alt="${event.organizer}"
                        src="${event.profile}"
                        class="relative inline-block h-8 w-8 rounded-full"
                    />
                    <div class="flex flex-col ml-3 text-sm">
                        <span class="text-slate-800 font-semibold">${event.organizer}</span>
                        <span class="text-slate-600">
                            ${event.start_date} - ${event.end_date}
                        </span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Appeler la fonction pour générer les cartes d'événements
if (events && events.length > 0) {
    generateCards(events);
} else {
    console.error("Aucun événement trouvé dans le fichier JSON.");
}
