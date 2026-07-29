// Avatar ilustrado (flat design), estilo "avatar de app", com a mão
// acenando a cada 3 segundos. Chame renderAvatar('id-do-container')
// em qualquer <div class="photo-card" id="..."></div> vazio.

function renderAvatar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <svg class="avatar-illustration" viewBox="0 0 400 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Ilustração de Pedro Telles acenando">
      <!-- braço + mão acenando -->
      <g class="wave-hand">
        <path d="M298,404 C332,384 344,332 332,286 C326,264 308,254 298,266 C292,278 298,300 304,322 C312,352 306,384 300,404 Z" fill="#14161c"/>
        <ellipse cx="300" cy="258" rx="20" ry="24" fill="#D9A87A"/>
        <ellipse cx="284" cy="232" rx="7" ry="17" fill="#D9A87A" transform="rotate(-14 284 232)"/>
        <ellipse cx="299" cy="224" rx="7.5" ry="19" fill="#D9A87A" transform="rotate(-2 299 224)"/>
        <ellipse cx="315" cy="228" rx="7" ry="18" fill="#D9A87A" transform="rotate(10 315 228)"/>
        <ellipse cx="329" cy="238" rx="6.5" ry="15" fill="#D9A87A" transform="rotate(24 329 238)"/>
      </g>

      <!-- corpo / camiseta -->
      <path d="M78,520 C78,378 138,338 200,338 C262,338 322,378 322,520 Z" fill="#14161c"/>
      <path d="M170,338 C170,338 185,360 200,360 C215,360 230,338 230,338 L222,318 L178,318 Z" fill="#0d0e12"/>

      <!-- pescoço -->
      <rect x="170" y="300" width="60" height="55" rx="18" fill="#C9946A"/>

      <!-- orelhas -->
      <ellipse cx="117" cy="238" rx="15" ry="23" fill="#D9A87A"/>
      <ellipse cx="283" cy="238" rx="15" ry="23" fill="#D9A87A"/>

      <!-- cabeça -->
      <ellipse cx="200" cy="232" rx="87" ry="99" fill="#D9A87A"/>

      <!-- bochechas -->
      <ellipse cx="142" cy="258" rx="16" ry="9" fill="#E8A585" opacity="0.55"/>
      <ellipse cx="258" cy="258" rx="16" ry="9" fill="#E8A585" opacity="0.55"/>

      <!-- cavanhaque -->
      <path d="M178,296 C178,296 186,332 200,334 C214,332 222,296 222,296 C214,306 186,306 178,296 Z" fill="#241a12"/>

      <!-- boca (sorriso) -->
      <path d="M174,284 Q200,302 226,284 Q200,296 174,284 Z" fill="#fff"/>
      <path d="M174,284 Q200,300 226,284" fill="none" stroke="#5c3a20" stroke-width="2.5" stroke-linecap="round"/>

      <!-- bigode -->
      <path d="M162,272 Q200,262 238,272 Q228,282 200,278 Q172,282 162,272 Z" fill="#241a12"/>

      <!-- nariz -->
      <path d="M197,222 Q191,244 199,250 Q206,247 204,243" fill="none" stroke="#B87F53" stroke-width="3" stroke-linecap="round"/>

      <!-- olhos -->
      <ellipse cx="167" cy="220" rx="13" ry="15" fill="#fff"/>
      <ellipse cx="233" cy="220" rx="13" ry="15" fill="#fff"/>
      <circle cx="169" cy="224" r="7" fill="#1a120b"/>
      <circle cx="235" cy="224" r="7" fill="#1a120b"/>
      <circle cx="171" cy="221" r="2" fill="#fff"/>
      <circle cx="237" cy="221" r="2" fill="#fff"/>

      <!-- sobrancelhas -->
      <path d="M148,200 Q166,189 187,198" fill="none" stroke="#241a12" stroke-width="7" stroke-linecap="round"/>
      <path d="M213,198 Q234,189 252,200" fill="none" stroke="#241a12" stroke-width="7" stroke-linecap="round"/>

      <!-- costeletas -->
      <path d="M118,220 C112,245 114,268 124,285 L134,278 C126,262 124,240 128,218 Z" fill="#241a12"/>
      <path d="M282,220 C288,245 286,268 276,285 L266,278 C274,262 276,240 272,218 Z" fill="#241a12"/>

      <!-- cabelo -->
      <path d="M112,222 C104,150 132,88 200,86 C268,88 296,150 288,222
               L272,196 L256,232 L242,192 L228,228 L212,190 L200,224
               L188,190 L172,228 L158,192 L144,232 L128,196 Z" fill="#241a12"/>
    </svg>
  `;
}
