<script>
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

  let showContact = false;
  let showSummary = false;
  let showExperience = false;
</script>

<div class="min-h-screen bg-gray-800 flex items-center justify-center">
  <div class="bg-gray-900 border-4  border-white p-6 rounded-lg">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-3 text-center text-white text-4xl font-bold mb-4 border border-white p-2">
        Jackson Ernst
        <h2 class="col-span-3 text-center font-thin text-lg">
          Full Stack Web3 Developer and Protocol Engineer
        </h2>
      </div>
      <div class="col-span-1 text-white text-lg border border-white p-2">
        <button on:click|preventDefault={() => (showContact = !showContact)}>
          <h2 class="text-xl font-bold mb-2">Contact</h2>
        </button>
        {#if showContact}
          <div>
            <p>123 Main Street</p>
            <p>San Diego, CA 92101</p>
            <p>(123) 456-7890</p>
            <p>johndoe@email.com</p>
          </div>
        {/if}
      </div>
      <div class="col-span-2 text-white text-lg border border-white p-2">
        <button on:click|preventDefault={() => (showSummary = !showSummary)}>
          <h2 class="text-xl font-bold mb-2">Summary</h2>
        </button>
        {#if showSummary}
          <div>
            <p>Full stack developer with 5+ years of experience in developing web applications using modern technologies. Proficient in JavaScript, React, Node.js, and MongoDB.</p>
          </div>
        {/if}
      </div>
      <div class="col-span-3 text-white text-lg border border-white p-2">
        <button on:click|preventDefault={() => (showExperience = !showExperience)}>
          <h2 class="text-xl font-bold mb-2">Experience</h2>
        </button>
        {#if showExperience}
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