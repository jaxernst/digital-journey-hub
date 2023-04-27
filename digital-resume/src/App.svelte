<script lang="ts">
  import TwitterLogo from "./assets/twitter-logo.svelte";
  import GithubLogo from "./assets/github-logo.svelte";
  import LinkedinLogo from "./assets/linkedin-logo.svelte";
  import ExternalLinkLogo from "./assets/external-link.svelte";
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
  const sectionHeader = " text-sm font-bold mb-2 md:text-lg ";
  const activeSectionTw = " z-10 col-span-3 ";

  const durationMain = 450;
  const [send, receive] = crossfade({
    duration: durationMain,
    easing: cubicInOut,
    fallback: scale,
  });

  type Section = "about" | "skillset" | "education" | "experience" | "projects";

  const activeSection = writable<null | Section>(null);
  $: toggleSection = (section: Section) =>
    $activeSection === section
      ? activeSection.set(null)
      : activeSection.set(section);

  $: isActive = (section: Section) => $activeSection == section;
</script>

<SvelteToast />

<div class="flex min-h-screen items-center justify-center bg-gray-800">
  <div
    class="w-[550px] rounded-lg border-4 bg-gray-900 p-6 text-left shadow-lg"
  >
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
              <p class="p-2">
                I am a developer who believes in the power of open and
                decentralized technology. I am driven by my crypto-native nerd
                side, which has allowed me to become deeply familiar with many
                technical concepts relating to the Ethereum protocol ecosystem
                and blockchain technology as a whole.
              </p>
              <p class="p-2">
                I have experience building on most layers of the decentralized
                application stack, from creating beautiful user interfaces to
                developing and deploying meta-transaction execution
                infrastructure for a novel MEV capture protocol.
              </p>
              <p class="p-2">
                I'm always down for a challenge and I never stop learning {" :)"}
              </p>
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
              <div class="flex justify-end gap-3 text-xs">
                <div class="flex text-pink-500">
                  <div class="h-2 w-2 rounded-full bg-pink-500" />
                  Actively learning
                </div>
                <div class="flex text-violet-500">
                  <div class="h-2 w-2 rounded-full bg-violet-500" />
                  Proficient
                </div>
                <div class="flex text-green-600">
                  <div class="green-600 h-2 w-2 rounded-full bg-green-600" />
                  Advanced
                </div>
              </div>
              <h1 class="mt-2 text-sm font-bold">Languages</h1>
              <div class="flex flex-wrap gap-3 p-2">
                <div class="text-green-600">TypeScript</div>
                <div class="text-green-600">Solidity</div>
                <div class="text-violet-500">JavaScript</div>
                <div class="text-green-600">Python</div>
                <div class="text-pink-500">Elixir</div>
                <div class="text-pink-500">Go</div>
                <div class="text-pink-500">Rust</div>
              </div>

              <h1 class="mt-2 text-sm font-bold">
                Smart Contract Tools / Frameworks
              </h1>
              <div class="flex flex-wrap gap-3 p-2">
                <div class="text-green-600">Hardhat</div>
                <div class="text-violet-500">Foundry</div>
                <div class="text-green-600">Ethers js</div>
                <div class="text-violet-500">Web3 js</div>
                <div class="text-pink-500">Viem</div>
                <div class="text-pink-500">WalletConnect</div>
              </div>

              <h1 class="mt-2 text-sm font-bold">UI / Other JS Frameworks</h1>
              <div class="flex flex-wrap gap-3 p-2">
                <div class="text-green-600">Svelte</div>
                <div class="text-violet-500">Svelte-Kit</div>
                <div class="text-green-600">React</div>
                <div class="text-green-600">Preact</div>
                <div class="text-violet-500">Zod</div>
                <div class="text-violet-500">Playwright</div>
              </div>
              <h1 class="mt-2 text-sm font-bold">
                Additional Skills / Knowledge
              </h1>
              <div class="flex flex-col gap-1 p-2">
                <div class="text-green-600">Decentralized Exchange Design</div>
                <div class="text-green-600">MEV Ecosystem</div>
                <div class="text-violet-600">Ethereum Rollup Architecture</div>
                <div class="text-violet-600">Bridging Architecture</div>
                <div class="text-green-600">Smart Contract Auditing</div>
                <div class="text-violet-500">UI/UX Design</div>
                <div class="text-pink-500">
                  OP Stack + Superchain Standardization
                </div>
                <div class="text-pink-500">Zero-Knowledge Proof Systems</div>
              </div>
            </div>
          {/if}
        </div>
      {/key}

      <!-- Education Section -->
      {#key $activeSection}
        <div
          in:receive={{ key: "education" }}
          out:send={{ key: "education" }}
          class={"row-start-1 " +
            sectionStyle +
            (isActive("education")
              ? "z-10 col-span-3 col-start-1 bg-gray-900 shadow-lg "
              : "col-start-3 text-dark-white")}
        >
          <button on:click={() => toggleSection("education")}>
            <h2 class={sectionHeader}>Education</h2>
          </button>

          {#if isActive("education")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain / 2,
                easing: sineInOut,
              }}
              out:slide={{ duration: 100 }}
            >
              <!-- Fill out this section with an example education resume section-->
              <div class="flex justify-between">
                <p>B.S. Aerospace Engineering</p>
                <p><i>Sep. 2017 - May 2021</i></p>
              </div>
              <h class="text-lg font-bold">
                California Polytechnic State University (Cal Poly)
              </h>

              <p>San Luis Obispo, CA</p>

              <p class="mt-3"><span class="font-bold">GPA:</span> 3.4</p>
              <p class="mt-3">
                <span class="font-bold">Featured Coursework:</span>
                Computational Fluid Dynamics | Statistical Methods in Engineering
                | Linear Analysis | Calculus Series (I-IV) | Technical Writing for
                Engineers | System Engineering Design
              </p>
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
              <div class="mx-1 my-4">
                <p class="text-dark-white"><i>Hello World Labs</i></p>
                <div class="flex justify-between">
                  <h3 class="text-lg font-bold">
                    Full Stack Engineer - eth.co
                  </h3>
                  <p>Jan 2023 - Present</p>
                </div>
                <ul class="list-inside list-disc">
                  <li class="p-2">
                    Led the frontend codebase migration from Javascript to
                    Typescript, designing a type system for improved code
                    quality and maintainability.
                  </li>
                  <li class="p-2">
                    Integrated an end-to-end testing environment to cover
                    interfaces between the Elixir-based backend, the Preact UI,
                    and the ENS + NFT aggregation middleware
                  </li>
                  <li class="p-2">
                    Introduced a suite of frontend hooks to facilitate data
                    fetching from an ENS and NFT api.
                  </li>
                  <li class="p-2">
                    Developed an administrative tool to mock Sign In With
                    Ethereum authentication and 'impersonate' ENS profiles.
                  </li>
                </ul>
              </div>

              <div class="mx-1 my-4">
                <p class="text-dark-white"><i>Clerkenwell Labs</i></p>
                <div class="flex justify-between">
                  <h3 class="text-lg font-bold">Software Design Engineer</h3>
                  <p>Jan 2022 - Feb 2023</p>
                </div>
                <ul class="list-inside list-disc">
                  <li class="p-2">
                    Co-developed a smart contract transaction priority
                    market/protocol to facilitate application layer MEV capture
                  </li>
                  <li class="p-2">
                    Lead the development of off-chain 'keeper' infrastructure to
                    order and execute blocks of meta-transactions queued through
                    the protocol
                  </li>
                  <li class="p-2">
                    Created & tested a reference implementation DEX (Uniswap V2
                    fork) which integrates our protocol to capture MEV revenue
                    and redistribute it to LPs and traders
                  </li>
                  <li class="p-2">
                    Lead the development of a DEX arbitrage bot to trade stale
                    prices of testnet pools and facilitate protocol testing
                  </li>
                </ul>
              </div>

              <div class="mx-1 my-4">
                <p class="text-dark-white"><i>Moog Aircraft Group</i></p>
                <div class="flex justify-between">
                  <h3 class="text-lg font-bold">Software Systems Engineer</h3>
                  <p>2020 - 2022</p>
                </div>
                <ul class="list-inside list-disc">
                  <li class="p-2">
                    Developed low level and high-level tests to verify flight
                    critical software requirements
                  </li>
                  <li class="p-2">
                    Lead the development of a Python library to record and
                    analyze 1394b network communication across redundant flight
                    control system processors.
                  </li>
                  <li class="p-2">
                    Contributed to the development of a proprietary Python based
                    data analysis and testing framework for requirement
                    validation and verification.
                  </li>
                </ul>
              </div>
            </div>
          {/if}
        </div>
      {/key}

      <!-- Projects Section -->
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
            <div transition:slide class="p-2">
              <div class="my-2">
                <div class="my-2 flex gap-2">
                  <a
                    href="https://github.com/jaxernst"
                    class=" flex hover:underline"
                  >
                    <h1 class="text-lg font-bold text-dark-white">
                      Social Commitment Protocol
                    </h1>
                    <div class="h-4 w-4 stroke-dark-white">
                      <ExternalLinkLogo />
                    </div>
                  </a>
                </div>
                <p>
                  The social commitment protocol is a set of smart contracts and
                  smart contract libraries I developed to facilitate onchain
                  social 'commitments'. A commitment, by definition, is a
                  promise or agreement to do <i>something</i> in the future. The
                  protocol provides the primitives and tools needed to build dapps
                  designed to help users be the best version of themselves.
                </p>
              </div>
            </div>
          {/if}
        </div>
      {/key}
    </div>

    <h1 class="pb-2 pt-6 text-lg font-bold">Featured</h1>

    <!-- Highlights Section -->
    <div class="flex overflow-x-scroll">
      <div
        class="relative m-2 flex-shrink-0 overflow-hidden rounded-2xl border border-dark-white"
      >
        <video
          autoplay
          loop
          muted
          playsinline
          style="height:130px; width:230px"
          src={"boid-demo.mp4"}
        />
        <div
          class="absolute bottom-0 left-0 w-full bg-grey-trans py-1 pl-2 text-xs font-bold text-white"
        >
          <p>Boids</p>
          <p style="font-size:10px;">Interactive Flocking</p>
        </div>
      </div>

      <div
        style="height:130px; width:200px"
        class="relative m-2 flex-shrink-0 overflow-hidden rounded-2xl border border-dark-white"
      >
        <video autoplay loop muted playsinline src={"sac-demo.mp4"} />
        <div
          class="absolute bottom-0 left-0 w-full bg-grey-trans py-1 pl-2 text-xs font-bold text-white"
        >
          <p>Social Alarm Clock</p>
          <p style="font-size:9px;">Winning Prop House proposal</p>
        </div>
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
