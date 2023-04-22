<script lang="ts">
  import { derived, writable } from "svelte/store";
  import "./tailwind.css";
  import { crossfade, scale, fade, slide } from "svelte/transition";
  import {
    cubicInOut,
    bounceIn,
    expoInOut,
    elasticOut,
    circInOut,
    sineInOut,
  } from "svelte/easing";

  /* SECTIONS:

  About, 
  Professional experience, 
  Projects, 
  Skillsets
    - General purpose programming languages
    - Domain specific languages
    - Frameworks
    - Architecutre

  Interests, 
  Services
  */

  const durationMain = 450;
  const [send, receive] = crossfade({
    duration: durationMain,
    easing: cubicInOut,
    fallback: scale,
  });

  type Section = "about" | "experience" | "projects" | "skillset" | "contact";

  const sectionHeader = "text-xl font-bold mb-2";

  const activeSection = writable<null | Section>(null);
  $: toggleSection = (section: Section) =>
    $activeSection === section
      ? activeSection.set(null)
      : activeSection.set(section);
  $: isActive = (section: Section) => $activeSection == section;
</script>

<div
  class="flex min-h-screen items-center justify-center bg-gray-800 px-[10vw] sm:px-0"
>
  <div class="rounded-lg border-4 bg-gray-900 p-6 text-left shadow-lg">
    <div
      class="col-span-3 mb-4 rounded border border-b-white p-4 text-center text-4xl font-bold text-white"
    >
      Jackson Ernst
      <h2 class="col-span-3 text-center text-lg font-thin">
        Full Stack Web3 Developer and Protocol Engineer
      </h2>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <!-- About Section -->
      {#key $activeSection}
        <div
          in:receive={{ key: "about" }}
          out:send={{ key: "about" }}
          class={"col-start-1 row-start-1 " +
            (isActive("about")
              ? "z-10 col-span-3 bg-gray-900 shadow-lg "
              : " ") +
            "rounded border border-b-white p-2"}
        >
          <button on:click={() => toggleSection("about")}>
            <h2 class="mb-2 text-xl font-bold">About</h2>
          </button>

          {#if isActive("about")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain / 2,
                easing: sineInOut,
              }}
              out:slide={{ duration: 100 }}
            >
              <p>Information about me</p>
              <p>Interests</p>
              <div>More info about myself More info about myself</div>
            </div>
          {/if}
        </div>
      {/key}

      <!-- Skillset Section -->
      {#key $activeSection}
        <div
          in:receive={{ key: "skillset" }}
          out:send={{ key: "skillset" }}
          class={"row-start-1 " +
            (isActive("skillset")
              ? "z-10 col-span-3 col-start-1 bg-gray-900 shadow-lg "
              : "col-start-2 ") +
            "rounded border border-b-white p-2"}
        >
          <button on:click={() => toggleSection("skillset")}>
            <h2 class="mb-2 text-xl font-bold">Skillset</h2>
          </button>

          {#if isActive("skillset")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain / 2,
                easing: sineInOut,
              }}
              out:slide={{ duration: 100 }}
            >
              <p>Languages</p>
              <p>Frameworks</p>
              <div>Strengths</div>
            </div>
          {/if}
        </div>
      {/key}

      <!-- Contact Section -->
      {#if !isActive("contact")}
        <div
          in:receive={{ key: "contact" }}
          out:send={{ key: "contact" }}
          class={"col-start-3 row-start-1 rounded border border-b-white bg-gray-900 p-2"}
        >
          <button on:click|preventDefault={() => toggleSection("contact")}>
            <h2 class={sectionHeader}>Contact</h2>
          </button>
        </div>
      {:else}
        <div
          in:receive={{ key: "contact" }}
          out:send={{ key: "contact" }}
          class={"z-10 col-span-3 col-start-1 row-start-1 rounded border border-b-white bg-gray-900 p-2"}
        >
          <button on:click|preventDefault={() => toggleSection("contact")}>
            <h2 class={sectionHeader}>Contact</h2>
          </button>
          <div>
            <p>123 Main Street</p>
            <p>San Diego, CA 92101</p>
            <p>(123) 456-7890</p>
            <p>johndoe@email.com</p>
          </div>
        </div>
      {/if}

      <!-- Projects Section -->
      <div
        class={"col-span-full rounded border border-b-white bg-gray-900 p-2"}
      >
        <button on:click|preventDefault={() => toggleSection("projects")}>
          <h2 class={sectionHeader}>Projects</h2>
        </button>
        {#if isActive("projects")}
          <div>
            <p>
              Full stack developer with 5+ years of experience in developing web
              applications using modern technologies. Proficient in JavaScript,
              React, Node.js, and MongoDB.
            </p>
          </div>
        {/if}
      </div>

      <!-- Experience Section -->
      <div
        class={"col-span-full row-start-2 rounded border border-b-white bg-gray-900 p-2"}
      >
        <button on:click|preventDefault={() => toggleSection("experience")}>
          <h2 class={sectionHeader}>Professional Experience</h2>
        </button>
        {#if isActive("experience")}
          <div>
            <h3 class="text-lg font-bold">
              Full Stack Developer - XYZ Company
            </h3>
            <p>Jan 2018 - Present</p>
            <ul class="mb-4 list-inside list-disc">
              <li>
                Developed and maintained web applications using React and
                Node.js.
              </li>
              <li>Implemented RESTful APIs using Express.js and MongoDB.</li>
              <li>
                Collaborated with cross-functional teams to deliver high-quality
                software.
              </li>
            </ul>
            <h3 class="text-lg font-bold">Web Developer - ABC Company</h3>
            <p>Jun 2016 - Dec 2017</p>
            <ul class="list-inside list-disc">
              <li>
                Developed and maintained the company website using HTML, CSS,
                and JavaScript.
              </li>
              <li>
                Implemented responsive design to ensure optimal user experience
                on all devices.
              </li>
              <li>
                Collaborated with the marketing team to create engaging content
                for the website.
              </li>
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
