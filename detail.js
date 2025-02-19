
        // Fonction pour charger les événements
fetch('./event.json')
    .then(response => response.json())
    .then(data => {
        const events = data.events;

        // Extraction des paramètres d'URL
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = parseInt(urlParams.get('id'));

        // Trouver l'événement basé sur l'ID
        const event = events.find(e => e.id === eventId);
        const eventDetailContainer = document.getElementById('event-detail');
        
        // Construction de l'URL de la carte
        if (event) {
            const mapEmbed = encodeURIComponent(event.venue + ", " + event.city);
            const iframeSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.987715757123!2d-7.589197684800722!3d33.57324918073488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778a113b1%3A0xe3d3f5e5a5a5a5a5!2s${mapEmbed}!5e0!3m2!1sfr!2sma!4v1633024800000!5m2!1sfr!2sma`;

            // Affichage des détails de l'événement
            eventDetailContainer.innerHTML = `
                <h1 class="text-4xl font-bold text-gray-800 mb-4">${event.title}</h1>
                <hr class="border-black mb-8">
                <div class="flex flex-wrap gap-4 mb-8">
                    <div class="p-4 rounded-lg">
                        <span class="text-gray-600">Date de début :</span>
                        <span class="font-semibold">${event.start_date}</span>
                    </div>
                    <div class="p-4 rounded-lg">
                        <span class="text-gray-600">Date de fin :</span>
                        <span class="font-semibold">${event.end_date}</span>
                    </div>
                    <div class="p-4 rounded-lg">
                        <span class="text-gray-600">Prix :</span>
                        <span class="font-semibold">${event.price}</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 mb-8">
                    <div class=" rounded-lg mb-8 overflow-hidden">
                        <img src="${event.image_url}" alt="Event Image" class="w-full h-100 object-cover">
                        <div class="p-6">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                            <p class="text-gray-600 mb-6">${event.description}</p>
                            <button id="participate-button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                                Participer
                            </button>
                        </div>
                    </div>
                    <hr class="border-black my-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 p-6 rounded-lg">
                        <div class="p-6 rounded-lg">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">Détaille</h2>
                            <ul class="text-gray-600">
                                <li class="mb-2"><span class="font-semibold">De :</span> ${event.start_date}</li>
                                <li class="mb-2"><span class="font-semibold">A :</span> ${event.end_date}</li>
                                <li class="mb-2"><span class="font-semibold">Prix :</span> ${event.price}</li>
                            </ul>
                        </div>
                        <div class="p-6 rounded-lg">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">Organisateur</h2>
                            <ul class="text-gray-600">
                                <li class="mb-2"><span class="font-semibold">Nom :</span> ${event.organizer}</li>
                                <li class="mb-2"><span class="font-semibold">Téléphone :</span> ${event.phone}</li>
                                <li class="mb-2"><span class="font-semibold">Email :</span> <a href="mailto:${event.email}">${event.email}</a></li>
                            </ul>
                        </div>
                        <div class="p-6 rounded-lg">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">Lieu</h2>
                            <p class="text-gray-600 mb-4">${event.city} - ${event.venue}</p>
                        </div>
                        <div class="col-span-1 md:col-span-3 p-6 rounded-lg">
                            <iframe
                                src="${iframeSrc}"
                                width="100%"
                                height="400"
                                style="border:0;"
                                allowfullscreen=""
                                loading="lazy"
                                class="w-full h-96 object-cover rounded-lg"
                            ></iframe>
                        </div>
                    </div>
                </div>
                
            `;
        } else {
            eventDetailContainer.innerHTML = `
                <div class="rounded-lg p-6 w-full text-center h-96">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">Événement non trouvé</h1>
                    <p class="text-gray-600">L'événement que vous cherchez n'existe pas.</p>
                </div>
            `;
        }
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
