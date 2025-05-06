<script lang="ts">
    import type { ShapeInput } from '$models';
    import { CalendarDate, type DateValue } from '@internationalized/date';
    export let shapeInput       : ShapeInput;
    export let currentDate: DateValue;

    
</script>
{#snippet control()}
{#each ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'] as day}
<div class="text-muted-foreground text-xs text-center font-medium">{day}</div>
{/each}

{#if true}
{@const year = currentDate.year}
{@const month = currentDate.month}
{@const firstDay = new Date(year, month - 1, 1)}
{@const lastDay = new Date(year, month, 0)}
{@const daysInMonth = lastDay.getDate()}
{@const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1}
{@const today = new Date()}
{@const todayDate = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())}
{#each Array(6 * 7) as _, i}
{@const dayIndex = i - startOffset + 1}
{@const isCurrentMonth = dayIndex > 0 && dayIndex <= daysInMonth}
{@const prevMonthLastDay = new Date(year, month - 1, 0).getDate()}
{@const day = isCurrentMonth ? dayIndex : (dayIndex <= 0 ? prevMonthLastDay + dayIndex : dayIndex - daysInMonth)}
{@const dateValue = isCurrentMonth ? new CalendarDate(year, month, day) : null}
{@const isOutOfRange = isCurrentMonth && dateValue && (
    (shapeInput.minValue && dateValue < shapeInput.minValue) || 
    (shapeInput.maxValue && dateValue > shapeInput.maxValue)
)}
{@const isInvalidDate = isCurrentMonth && dateValue && shapeInput.invalidDates && shapeInput.invalidDates.includes(dateValue.toString())}
{@const isInvalid = isOutOfRange || isInvalidDate}
<slot />
{/each}
{/if}
{/snippet}