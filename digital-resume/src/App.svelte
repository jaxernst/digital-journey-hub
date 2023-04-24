<script lang="ts">
  import TwitterLogo from "./assets/twitter-logo.svelte";
  import GithubLogo from "./assets/github-logo.svelte";
  import LinkedinLogo from "./assets/linkedin-logo.svelte";
  import { derived, writable } from "svelte/store";

  import "./tailwind.css";

  import { crossfade, scale, fade, slide } from "svelte/transition";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  import { clickToCopyAction } from "svelte-legos";
  import { Slidy } from "@slidy/svelte";
  import {
    cubicInOut,
    bounceIn,
    expoInOut,
    elasticOut,
    circInOut,
    sineInOut,
    cubicOut,
  } from "svelte/easing";

  import EmailLogo from "./assets/email-logo.svelte";

  const slides = [
    {
      id: 1,
      width: 250,
      height: 130,
      src: "src/assets/digital-boids-preview.png",
    },
  ];

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

  const sectionStyle = " bg-gray-900 rounded border border-b-white p-2 ";
  const sectionHeader = "text-sm font-bold mb-2 md:text-lg";
  const activeSectionTw = " z-10 col-span-3 ";

  const durationMain = 450;
  const [send, receive] = crossfade({
    duration: durationMain,
    easing: cubicInOut,
    fallback: scale,
  });

  type Section = "about" | "skillset" | "contact" | "experience" | "projects";

  const activeSection = writable<null | Section>(null);
  $: toggleSection = (section: Section) =>
    $activeSection === section
      ? activeSection.set(null)
      : activeSection.set(section);

  $: isActive = (section: Section) => $activeSection == section;
</script>

<SvelteToast />

<div
  class="md flex min-h-screen items-center justify-center bg-gray-800 px-0 px-[10vw]"
>
  <div class="rounded-lg border-4 bg-gray-900 p-6 text-left shadow-lg">
    <div
      class="col-span-3 border-b-white text-center text-4xl font-bold text-white"
    >
      Jackson Ernst
      <h2 class="col-span-3 text-center text-lg font-thin">
        Full Stack Web3 Developer
      </h2>
    </div>

    <!-- Links/Icons -->
    <div class="custom-grid place-items-center py-4 pb-6">
      <div />
      <div class="flex place-items-center gap-4">
        <a href="https://github.com/jaxernst" class="h-6 w-6"><GithubLogo /></a>
        <a href="https://twitter.com/yachtyyachty" class="h-6 w-6"
          ><TwitterLogo /></a
        >
        <a
          href="https://www.linkedin.com/in/jackson-ernst-9ab68014a/"
          class="h-6 w-6"><LinkedinLogo /></a
        >
        <button
          class="h-8 w-8"
          use:clickToCopyAction={"jaxernst@gmail.com"}
          on:click={() => toast.push("jaxernst@gmail.com copied to clipboard!")}
        >
          <EmailLogo />
        </button>
      </div>
      <div />
    </div>

    <!-- Card Sections -->
    <div class="grid grid-cols-3 gap-4">
      <!-- About Section -->
      {#key $activeSection}
        <div
          in:receive={{ key: "about" }}
          out:send={{ key: "about" }}
          class={"col-start-1 row-start-1 " +
            sectionStyle +
            (isActive("about") ? activeSectionTw : " text-dark-white ")}
        >
          <button on:click={() => toggleSection("about")}>
            <h2 class={sectionHeader}>About</h2>
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
            sectionStyle +
            (isActive("skillset")
              ? "z-10 col-span-3 col-start-1 bg-gray-900 shadow-lg "
              : "col-start-2 text-dark-white")}
        >
          <button on:click={() => toggleSection("skillset")}>
            <h2 class={sectionHeader}>Skillset</h2>
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
      {#key $activeSection}
        <div
          in:receive={{ key: "contact" }}
          out:send={{ key: "contact" }}
          class={"row-start-1 " +
            sectionStyle +
            (isActive("contact")
              ? "z-10 col-span-3 col-start-1 bg-gray-900 shadow-lg "
              : "col-start-3 text-dark-white")}
        >
          <button on:click={() => toggleSection("contact")}>
            <h2 class={sectionHeader}>Contact</h2>
          </button>

          {#if isActive("contact")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain / 2,
                easing: sineInOut,
              }}
              out:slide={{ duration: 100 }}
            >
              <div>
                <p>123 Main Street</p>
                <p>San Diego, CA 92101</p>
                <p>(123) 456-7890</p>
                <p>johndoe@email.com</p>
              </div>
            </div>
          {/if}
        </div>
      {/key}

      <!-- Experience Section -->
      {#key $activeSection}
        <div
          in:receive={{ key: "experience" }}
          out:send={{ key: "experience" }}
          class={"row-start-2 " +
            sectionStyle +
            (isActive("experience")
              ? "z-10 col-span-3 col-start-1 row-start-1 bg-gray-900 shadow-lg "
              : "col-start-1 text-dark-white")}
        >
          <button on:click={() => toggleSection("experience")}>
            <h2 class={sectionHeader}>Experience</h2>
          </button>

          {#if isActive("experience")}
            <div transition:slide>
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
                  Collaborated with cross-functional teams to deliver
                  high-quality software.
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
                  Implemented responsive design to ensure optimal user
                  experience on all devices.
                </li>
                <li>
                  Collaborated with the marketing team to create engaging
                  content for the website.
                </li>
              </ul>
            </div>
          {/if}
        </div>
      {/key}

      {#key $activeSection}
        <div
          in:receive={{ key: "projects" }}
          out:send={{ key: "projects" }}
          class={"row-start-2 " +
            sectionStyle +
            (isActive("projects")
              ? "z-10 col-span-3 col-start-1 row-start-1 bg-gray-900 shadow-lg "
              : "col-start-2 text-dark-white")}
        >
          <button on:click={() => toggleSection("projects")}>
            <h2 class={sectionHeader}>Projects</h2>
          </button>

          {#if isActive("projects")}
            <div transition:slide>
              <div class="border border-dark-white" />
              <h2>Projects</h2>
              <div class="border border-dark-white" />
              <h2>Projects</h2>
              <div class="border border-dark-white" />
              <h2>Projects</h2>
              <div class="border border-dark-white" />
            </div>
          {/if}
        </div>
      {/key}
    </div>

    <h1 class="py-4 pt-6 text-lg font-bold">Featured</h1>

    <!-- Highlights Section -->
    <div
      style="height:130px; width:250px"
      class="relative m-2 overflow-hidden rounded-2xl border border-dark-white"
    >
      <video autoplay loop muted playsinline src={"src/assets/boid-demo.mp4"} />
      <div
        class="bg-dark-white-trans absolute bottom-0 left-0 h-[19%] w-full p-0 pl-4 text-sm font-bold text-white"
      >
        Boids: Interactive Flocking
      </div>
    </div>
  </div>
</div>

<style>
  .custom-grid {
    display: grid;
    grid-template-columns: 1fr minmax(0, 200px) 1fr;
  }
</style>
