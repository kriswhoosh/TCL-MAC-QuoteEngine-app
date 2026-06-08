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
      
      const viaText = document.getElementById('pcVia')?.value || '';
      const waypointCount = window.currentWaypointCount || 0;

      // Extract Surcharge Data
      const isAirline = document.getElementById('isAirline')?.value === 'true';
      const isTemp = document.getElementById('isTemp')?.value === 'true';
      const isFlatbed = document.getElementById('isFlatbed')?.value === 'true';
      const isAdr = document.getElementById('isAdr')?.value === 'true';
      const isUlez = document.getElementById('isUlez')?.value === 'true';
      const isOther = document.getElementById('isOther')?.value === 'true';
      const otherText = document.getElementById('otherText')?.value || '';
      const otherValue = parseFloat(document.getElementById('otherValue')?.value) || 0;
      
      launch({ miles, vehicle, pcA, pcB, distTxt, waypointCount, viaText, isAirline, isTemp, isFlatbed, isAdr, isUlez, isOther, otherText, otherValue });
    });
    initialized = true;
  }

  function extractMiles() {
      const txt = document.getElementById('distance')?.textContent || '';
      console.log("Bridge found distance text:", txt);
      
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

    // Send all new variables securely through the URL parameters
    const url = `${RATE_MATE_URL}?miles=${data.miles}&vehicle=${data.vehicle}&pcA=${data.pcA}&pcB=${data.pcB}&viaText=${encodeURIComponent(data.viaText)}&waypointCount=${data.waypointCount}&isAirline=${data.isAirline}&isTemp=${data.isTemp}&isFlatbed=${data.isFlatbed}&isAdr=${data.isAdr}&isUlez=${data.isUlez}&isCcz=${data.isCcz}&isOther=${data.isOther}&otherText=${encodeURIComponent(data.otherText)}&otherValue=${data.otherValue}`;

    card.style.display = 'block';
    iframe.src = url; 
    
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return { 
    init, 
    showButton: () => { 
        const btn = document.getElementById('btnRateMate');
        if(btn) btn.style.display = 'inline-block'; 
        
        const card = document.getElementById('rateMateCard');
        if (card && card.style.display === 'block') {
             const miles = extractMiles();
             const vehicle = document.getElementById('suggestedVehicle')?.value || 'LWB';
             const pcA = document.getElementById('pcA')?.value || '';
             const pcB = document.getElementById('pcB')?.value || '';
             const viaText = document.getElementById('pcVia')?.value || '';
             const waypointCount = window.currentWaypointCount || 0;
             
             // Dynamic Extraction for immediate UI updates
             const isAirline = document.getElementById('isAirline')?.value === 'true';
             const isTemp = document.getElementById('isTemp')?.value === 'true';
             const isFlatbed = document.getElementById('isFlatbed')?.value === 'true';
             const isAdr = document.getElementById('isAdr')?.value === 'true';
             const isUlez = document.getElementById('isUlez')?.value === 'true';
             const isCcz = document.getElementById('isCcz')?.value === 'true';
             const isOther = document.getElementById('isOther')?.value === 'true';
             const otherText = document.getElementById('otherText')?.value || '';
             const otherValue = parseFloat(document.getElementById('otherValue')?.value) || 0;

             launch({ miles, vehicle, pcA, pcB, waypointCount, viaText, isAirline, isTemp, isFlatbed, isAdr, isUlez, isOther, otherText, otherValue });
        }
    } 
  };
})();

RateMate.init();