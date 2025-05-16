<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let min = 0;
    export let max = 1;
    export let step = 1;
    export let value = 0;
    export let label = '';
    export let gradient = '';
    export let gradientColor = '';
    export let checkerboard = false;
    
    let sliderEl: HTMLElement;
    let isDragging = false;
    
    const dispatch = createEventDispatcher();
    
    function handleMouseDown(event: MouseEvent) {
      isDragging = true;
      updateValueFromPosition(event);
    }
    
    function handleMouseMove(event: MouseEvent) {
      if (isDragging) {
        updateValueFromPosition(event);
      }
    }
    
    function handleMouseUp() {
      isDragging = false;
    }
    
    function handleTouchStart(event: TouchEvent) {
      isDragging = true;
      updateValueFromTouch(event);
    }
    
    function handleTouchMove(event: TouchEvent) {
      if (isDragging) {
        updateValueFromTouch(event);
        event.preventDefault();
      }
    }
    
    function handleTouchEnd() {
      isDragging = false;
    }
    
    function updateValueFromPosition(event: MouseEvent) {
      const rect = sliderEl.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      updateValue(x);
    }
    
    function updateValueFromTouch(event: TouchEvent) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = sliderEl.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
        updateValue(x);
      }
    }
    
    function updateValue(position: number) {
      const range = max - min;
      const rawValue = min + (position * range);
      const steppedValue = Math.round(rawValue / step) * step;
      value = Math.max(min, Math.min(max, steppedValue));
      
      dispatch('change', { value });
    }
    
    $: gradientStyle = gradient ? `background: ${gradient};` : 
                     gradientColor ? `background: linear-gradient(to right, rgba(0,0,0,0), ${gradientColor});` : '';
    
    $: percentage = ((value - min) / (max - min)) * 100;
  </script>
  
  <svelte:window 
    on:mouseup={handleMouseUp}
    on:mousemove={handleMouseMove}
    on:touchend={handleTouchEnd}
    on:touchmove={handleTouchMove}
  />
  
  <div class="space-y-1">
    {#if label}
      <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>{label}</span>
        <span>{value.toFixed(step < 1 ? 2 : 0)}</span>
      </div>
    {/if}
    
    <div 
      bind:this={sliderEl}
      class="slider-track"
      class:checkerboard-bg={checkerboard}
      style={gradientStyle}
      on:mousedown={handleMouseDown}
      on:touchstart={handleTouchStart}
    >
      <div 
        class="slider-thumb"
        style="left: {percentage}%"
      ></div>
    </div>
  </div>
  
  <style>
    .slider-track {
      position: relative;
      height: 16px;
      border-radius: 8px;
      cursor: pointer;
      touch-action: none;
      overflow: hidden;
    }
    
    .checkerboard-bg {
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                       linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                       linear-gradient(45deg, transparent 75%, #ccc 75%), 
                       linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 8px 8px;
      background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
    }
    
    .slider-thumb {
      position: absolute;
      top: 50%;
      width: 12px;
      height: 12px;
      background-color: white;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  </style>