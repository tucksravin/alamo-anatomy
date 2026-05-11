<script lang="ts">
  import { PrismicRichText } from "@prismicio/svelte";
  import ContentWidth from "$lib/components/ContentWidth.svelte";
  import DefaultButton from "$lib/components/DefaultButton.svelte";
  import { datepicker } from "$lib/utils/datepicker";

  let { data } = $props();
  const d = $derived(data.page.data);

  let startDate = $state("");

  const inputClass =
    "w-full bg-white text-dark text-base placeholder:text-dark placeholder:opacity-60 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider rounded-sm p-4 outline-none focus:ring-2 focus:ring-dark/30 [color-scheme:light]";
  const textareaClass =
    "w-full bg-white text-dark text-base placeholder:text-dark placeholder:opacity-60 placeholder:text-base rounded-sm p-4 outline-none focus:ring-2 focus:ring-dark/30 resize-y";
</script>

<section class="pt-32 pb-20 lg:pt-40 lg:pb-28">
  <ContentWidth class="flex flex-col items-start text-left gap-10">
    <div class="w-full lg:w-3/4">
      <PrismicRichText field={d.s1_heading} />
    </div>

    <div class="w-full lg:w-3/4">
      <div class="mb-8">
        <PrismicRichText field={d.s1_subheading} />
      </div>

      <form
        name="reserve"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        class="flex flex-col gap-10"
      >
        <input type="hidden" name="form-name" value="reserve" />
        <p class="hidden">
          <label>Don't fill this out: <input name="bot-field" /></label>
        </p>

        <!-- Event Details -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Event Details</h4></legend>
          <div class="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              name="preferred_start_date"
              placeholder="Preferred Start Date*"
              required
              bind:value={startDate}
              use:datepicker
              class={inputClass}
            />
            <input
              type="text"
              name="preferred_end_date"
              placeholder="Preferred End Date*"
              required
              use:datepicker={{ minDate: startDate || "today" }}
              class={inputClass}
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="number" name="number_of_stations" placeholder="Number of Stations*" required min="1" class={inputClass} />
            <input type="text" name="time_slots" placeholder="Time Slots*" required class={inputClass} />
          </div>
          <input type="number" name="estimated_attendees" placeholder="Estimated Number of Attendees*" required min="1" class={inputClass} />
          <textarea name="event_description" placeholder="Description of Event*" required rows="6" class={textareaClass}></textarea>
        </fieldset>

        <!-- Lab Equipment -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Lab Equipment</h4></legend>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="text" name="c_arm_needed" placeholder="C-Arm Needed*" required class={inputClass} />
            <input type="text" name="drills_needed" placeholder="Drills Needed?*" required class={inputClass} />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="text" name="arthroscope_needed" placeholder="Arthroscope Needed?*" required class={inputClass} />
            <input type="text" name="tissue_type" placeholder="Type of Tissue Needed*" required class={inputClass} />
          </div>
          <textarea name="procedure_description" placeholder="Description of Procedure*" required rows="6" class={textareaClass}></textarea>
        </fieldset>

        <!-- Catering -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Catering</h4></legend>
          <div class="flex flex-col gap-2">
            {#each ["Breakfast", "Lunch", "Dinner", "Snacks", "None"] as meal}
              <label class="group flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="catering"
                  value={meal}
                  class="peer sr-only"
                />
                <span
                  class="size-4 border border-dark rounded-xs inline-block shrink-0 transition-colors duration-100 group-hover:bg-dark/10 peer-checked:bg-dark peer-focus-visible:ring-2 peer-focus-visible:ring-dark/30"
                ></span>
                <span>{meal}</span>
              </label>
            {/each}
          </div>
          <textarea name="additional_catering_info" placeholder="Additional Catering Info" rows="5" class={textareaClass}></textarea>
          <textarea name="diet_accommodations" placeholder="Diet Accommodation Requests" rows="5" class={textareaClass}></textarea>
        </fieldset>

        <!-- Lab Requestor Information -->
        <fieldset class="flex flex-col gap-5">
          <legend><h4 class="mb-4">Lab Requestor Information</h4></legend>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="text" name="main_contact_name" placeholder="Main Contact Name*" required class={inputClass} />
            <input type="text" name="requestor_company" placeholder="Requestor Company*" required class={inputClass} />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="email" name="requestor_email" placeholder="Requestor Email*" required class={inputClass} />
            <input type="tel" name="requestor_phone" placeholder="Requestor Phone*" required class={inputClass} />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="text" name="day_of_contact" placeholder="Contact the Day of Lab*" required class={inputClass} />
            <input type="text" name="ap_contact_name" placeholder="Accounts Payable Contact Name*" required class={inputClass} />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="tel" name="ap_contact_phone" placeholder="AP Contact Phone #*" required class={inputClass} />
            <input type="email" name="ap_contact_email" placeholder="AP Contact Email*" required class={inputClass} />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="text" name="billing_street" placeholder="Billing Street Address*" required class={inputClass} />
            <input type="text" name="billing_city" placeholder="Billing City*" required class={inputClass} />
          </div>
          <div class="flex flex-col sm:flex-row gap-5">
            <input type="text" name="billing_state" placeholder="Billing State*" required class={inputClass} />
            <input type="text" name="billing_zip" placeholder="Billing Zip Code*" required class={inputClass} />
          </div>
        </fieldset>

        <div>
          <DefaultButton dark>
            {d.s1_button_label || "Send Request"}
          </DefaultButton>
        </div>
      </form>
    </div>
  </ContentWidth>
</section>
