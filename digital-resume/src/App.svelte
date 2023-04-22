<script lang="ts">
  import { writable } from "svelte/store";
  import "./tailwind.css"

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

  const expandingSection = "text-dark-white hover:text-white hover:border-3 hover:border-3 transition-all text-lg border border-b-white p-2"
  const activeSectionTw = (section: Section) => {
    const sectionDisplay: Record<Section, string> = {
      experience: "col-span-3 row-span-3",
      about: "col-span-3"
    }
    return "text-white border-3 shadow-md " + sectionDisplay[section]

  } 
  const sectionHeader = "text-xl font-bold mb-2"

  type Section = "about" | "experience" | "projects" | "skillset" | "contact"

  const activeSection =  writable<null | Section>(null)
  $: toggleSection = (section: Section) => $activeSection === section ? activeSection.set(null) : activeSection.set(section)
  $: isActive = (section: Section) => $activeSection == section
</script>

<div class="min-h-screen bg-gray-800 flex items-center px-[10vw] justify-center">
  <div class="bg-gray-900 border-4  border-red p-6 rounded-lg shadow-lg">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-3 text-center text-white text-4xl font-bold mb-4 border border-b-white p-2">
        Jackson Ernst
        <h2 class="col-span-3 text-center font-thin text-lg">
          Full Stack Web3 Developer and Protocol Engineer
        </h2>
      </div>
      <div class={expandingSection + " " + (isActive("about") ? activeSectionTw("about") : "")}>
        <button on:click|preventDefault={() => toggleSection("about")}>
          <h2 class={sectionHeader}>About Myself</h2>
          
        </button>
        
        {#if isActive("about")}
          <div>
            More info about myself
            More info about myself
          </div>
        {/if}
      </div>
      <div class={expandingSection + " " + (isActive("skillset") ? activeSectionTw("skillset") : "")}>
        <button on:click|preventDefault={() => toggleSection("skillset")}>
          <h2 class={sectionHeader}>Skillset</h2>
          
        </button>
        
        {#if isActive("skillset")}
          <div>
           Typescript 
           Solidity
          </div>
        {/if}
      </div>
      <div class={expandingSection  + " " + (isActive("contact") ? ("contact") : "")}>
        <button on:click|preventDefault={() => toggleSection("contact")}>
          <h2 class={sectionHeader}>Contact</h2>
        </button>
        {#if isActive("contact")}
          <div>
            <p>123 Main Street</p>
            <p>San Diego, CA 92101</p>
            <p>(123) 456-7890</p>
            <p>johndoe@email.com</p>
          </div>
        {/if}
      </div>
      <div class={expandingSection  + " " + (isActive("projects") ? activeSectionTw("projects") : "")}>
        <button on:click|preventDefault={() => toggleSection("projects")}>
          <h2 class={sectionHeader}>Projects</h2>
        </button>
        {#if isActive("projects")}
          <div>
            <p>Full stack developer with 5+ years of experience in developing web applications using modern technologies. Proficient in JavaScript, React, Node.js, and MongoDB.</p>
          </div>
        {/if}
      </div>
      <div class={expandingSection   + " " + (isActive("experience") ? activeSectionTw("experience") : "")}>
        <button on:click|preventDefault={() => toggleSection("experience")}>
          <h2 class={sectionHeader}>Professional Experience</h2>
        </button>
        {#if isActive("experience")}
          <div>
            <h3 class="text-lg font-bold">Full Stack Developer - XYZ Company</h3>
            <p>Jan 2018 - Present</p>
            <ul class="list-disc list-inside mb-4">
              <li>Developed and maintained web applications using React and Node.js.</li>
              <li>Implemented RESTful APIs using Express.js and MongoDB.</li>
              <li>Collaborated with cross-functional teams to deliver high-quality software.</li>
            </ul>
            <h3 class="text-lg font-bold">Web Developer - ABC Company</h3>
            <p>Jun 2016 - Dec 2017</p>
            <ul class="list-disc list-inside">
              <li>Developed and maintained the company website using HTML, CSS, and JavaScript.</li>
              <li>Implemented responsive design to ensure optimal user experience on all devices.</li>
              <li>Collaborated with the marketing team to create engaging content for the website.</li>
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>