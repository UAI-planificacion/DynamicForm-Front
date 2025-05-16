<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let hue = 0;
    export let selectedSaturation = 1;
    export let selectedValue = 1;
    
    let canvasEl: HTMLElement;
    let isDragging = false;
    
    const dispatch = createEventDispatcher();
    
    function handleMouseDown(event: MouseEvent) {
      isDragging = true;
      updateColorFromPosition(event);
    }
    
    function handleMouseMove(event: MouseEvent) {
      if (isDragging) {
        updateColorFromPosition(event);
      }
    }
    
    function handleMouseUp() {
      isDragging = false;
    }
    
    function handleTouchStart(event: TouchEvent) {
      isDragging = true;
      updateColorFromTouch(event);
    }
    
    function handleTouchMove(event: TouchEvent) {
      if (isDragging) {
        updateColorFromTouch(event);
        event.preventDefault();
      }
    }
    
    function handleTouchEnd() {
      isDragging = false;
    }
    
    function updateColorFromPosition(event: MouseEvent) {
      const rect = canvasEl.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      
      const s = x;
      const v = 1 - y;
      
      selectedSaturation = s;
      selectedValue = v;
      
      dispatch('select', { s, v });
    }
    
    function updateColorFromTouch(event: TouchEvent) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = canvasEl.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
        
        const s = x;
        const v = 1 - y;
        
        selectedSaturation = s;
        selectedValue = v;
        
        dispatch('select', { s, v });
      }
    }
  </script>
  
  <svelte:window 
    on:mouseup={handleMouseUp}
    on:mousemove={handleMouseMove}
    on:touchend={handleTouchEnd}
    on:touchmove={handleTouchMove}
  />
  
  <div class="color-canvas-container">
    <div 
      bind:this={canvasEl}
      class="color-canvas"
      style="--hue: {hue}deg;"
      on:mousedown={handleMouseDown}
      on:touchstart={handleTouchStart}
    >
      <!-- White to transparent gradient (horizontal) -->
      <div class="gradient-white-transparent"></div>
      
      <!-- Black to transparent gradient (vertical) -->
      <div class="gradient-black-transparent"></div>
      
      <!-- Selector -->
      <div 
        class="selector"
        style="left: {selectedSaturation * 100}%; top: {(1 - selectedValue) * 100}%"
      ></div>
    </div>
  </div>
  
  <style>
    .color-canvas-container {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
    }
    
    .color-canvas {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: crosshair;
      touch-action: none;
      border-radius: 0.375rem;
      overflow: hidden;
      background: hsl(var(--hue), 100%, 50%);
    }
    
    .gradient-white-transparent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, white, transparent);
    }
    
    .gradient-black-transparent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent, black);
    }
    
    .selector {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  </style>