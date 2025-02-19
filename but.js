document.addEventListener("DOMContentLoaded", function () {
    let allEvents = [];
    let selectedCity = null; // Stocke la ville sélectionnée

    fetch('./event.json')
        .then(response => response.json())
        .then(data => {
            allEvents = data.events;
            generateCards(allEvents);
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

    const container = document.getElementById('events-container');
    const searchInput = document.querySelector('input[type="text"]');
    const buttons = document.querySelectorAll('.mt-4 button');

    // Fonction pour générer les cartes filtrées
    function generateCards(events) {
        container.innerHTML = "";
        if (!events || events.length === 0) {
            container.innerHTML = "<p>Aucun événement trouvé.</p>";
            return;
        }

        events.forEach(event => {
            const card = document.createElement('a');
            card.href = `detail.html?id=${event.id}`;
            card.classList.add('relative', 'flex', 'flex-col', 'my-6', 'bg-white', 'shadow-sm', 'border', 'border-slate-200', 'rounded-lg', 'w-96', 'min-w-[384px]');
            
            card.innerHTML = `
                <div class="relative h-80 m-2.5 overflow-hidden text-white rounded-md full">
                    <img src="${event.image_url}" alt="card-image"/>
                </div>
                <div class="p-4">
                    <div class="flex items-center justify-between w-full">
                        <div class="rounded-full bg-cyan-600 py-0.5 px-2.5 border text-xs text-white shadow-sm w-20 text-center">
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
                        <img alt="${event.organizer}" src="${event.profile}" class="h-8 w-8 rounded-full"/>
                        <div class="flex flex-col ml-3 text-sm">
                            <span class="text-slate-800 font-semibold">${event.organizer}</span>
                            <span class="text-slate-600">${event.start_date} - ${event.end_date}</span>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Filtrage par catégorie avec prise en compte de la ville sélectionnée
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const type = this.textContent.trim();
            buttons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
            this.classList.add('bg-blue-600', 'text-white');

            let filteredEvents = allEvents;
            
            if (selectedCity) {
                filteredEvents = filteredEvents.filter(event => event.city === selectedCity);
            }
            
            if (type !== "Tous") {
                filteredEvents = filteredEvents.filter(event => event.event_type === type);
            }

            generateCards(filteredEvents);
        });
    });

    // Recherche dynamique avec prise en compte de la ville sélectionnée
    searchInput.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        let filtered = allEvents.filter(event => event.title.toLowerCase().includes(searchText));

        if (selectedCity) {
            filtered = filtered.filter(event => event.city === selectedCity);
        }

        generateCards(filtered);
    });

    // Filtrage par ville
    function choisirVille(ville) {
        selectedCity = ville; // Met à jour la ville sélectionnée
        let filtered = allEvents.filter(event => event.city === ville);
        generateCards(filtered);
    }

    document.querySelectorAll("#ville-menu a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            choisirVille(this.textContent.trim());
        });
    });
});
