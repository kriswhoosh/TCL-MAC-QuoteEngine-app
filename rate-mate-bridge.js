const RateMate = (() => {
  const RATE_MATE_URL = './rate-mate.html';
  let initialized = false;

  function init() {
    const btn = document.getElementById('btnRateMate');
    if (!btn || initialized) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const miles = extractMiles();
      const hiddenVeh = document.getElementById('suggestedVehicle');
      const vehicle = hiddenVeh ? hiddenVeh.value : 'LWB';
      
      const pcA = document.getElementById('pcA')?.value || '';
      const pcB = document.getElementById('pcB')?.value || '';
      const distTxt = document.getElementById('distance')?.textContent || '';
      
      // Capturing waypoints and text for the final quote
      const viaText = document.getElementById('pcVia')?.value || '';
      const waypointCount = window.currentWaypointCount || 0;

      // AIRLINE LOGIC: Check if the airline surcharge chip is active
      const isAirline = document.getElementById('isAirline')?.value === 'true';
      
      launch({ miles, vehicle, pcA, pcB, distTxt, waypointCount, viaText, isAirline });
    });
    initialized = true;
  }

  function extractMiles() {
      // Grabs the text "171.23 miles" from the results
      const txt = document.getElementById('distance')?.textContent || '';
      console.log("Bridge found distance text:", txt);
      
      // Aggressive regex to find any number (even with decimals)
      const match = txt.match(/(\d+\.?\d*)/);
      
      if (match) {
          const miles = parseFloat(match[1]);
          console.log("Extracted miles for RATE-MATE:", miles);
          return miles;
      }
      
      console.log("Could not find a number in distance text.");
      return null;
    }

function launch(data) {
    const card = document.getElementById('rateMateCard');
    const iframe = document.getElementById('rateMateFrame');
    if (!card || !iframe) return;

    // This creates the "note" that gets handed to the calculator
    // Updated to include the isAirline parameter
    const url = `${RATE_MATE_URL}?miles=${data.miles}&vehicle=${data.vehicle}&pcA=${data.pcA}&pcB=${data.pcB}&viaText=${encodeURIComponent(data.viaText)}&waypointCount=${data.waypointCount}&isAirline=${data.isAirline}`;

    card.style.display = 'block';
    iframe.src = url; // This forces the frame to reload with the new data
    
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return { 
    init, 
    showButton: () => { 
        const btn = document.getElementById('btnRateMate');
        if(btn) btn.style.display = 'inline-block'; 
        
        // If the bridge is triggered again (e.g. by a vehicle change), 
        // we force an immediate launch update if the card is already visible
        const card = document.getElementById('rateMateCard');
        if (card && card.style.display === 'block') {
             const miles = extractMiles();
             const vehicle = document.getElementById('suggestedVehicle')?.value || 'LWB';
             const pcA = document.getElementById('pcA')?.value || '';
             const pcB = document.getElementById('pcB')?.value || '';
             const viaText = document.getElementById('pcVia')?.value || '';
             const waypointCount = window.currentWaypointCount || 0;
             const isAirline = document.getElementById('isAirline')?.value === 'true';
             launch({ miles, vehicle, pcA, pcB, waypointCount, viaText, isAirline });
        }
    } 
  };
})();

// Initialize the bridge
RateMate.init();