<script lang="ts">
  import TwitterLogo from "./assets/twitter-logo.svelte";
  import GithubLogo from "./assets/github-logo.svelte";
  import LinkedinLogo from "./assets/linkedin-logo.svelte";
  import ExternalLinkLogo from "./assets/external-link.svelte";
  import UpArrow from "./assets/arrow-up.svelte";
  import { writable } from "svelte/store";

  import "./tailwind.css";

  import { crossfade, scale, fade, slide } from "svelte/transition";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  import { clickToCopyAction } from "svelte-legos";
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
  import { onMount } from "svelte";

  const slides = [
    {
      id: 1,
      width: 250,
      height: 130,
      src: "src/assets/digital-boids-preview.png",
    },
  ];

  onMount(() => {
    (document.getElementById("vid1") as any).play();
    (document.getElementById("vid2") as any).play();
  });

  const sectionStyle =
    " text-left bg-gray-900 rounded border border-b-white p-2 max-h-[500px] overflow-y-auto  ";

  const sectionHeader = " font-bold mb-2 text-sm sm:text-lg ";
  const activeSectionTw = " z-10 col-span-3 ";

  const durationMain = 520;
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

  $: hoverEffectIfClosed = (section: Section) =>
    $activeSection === section
      ? " "
      : " transition duration-200 hover:scale-110 sm:hover:bg-dark-white hover:text-white hover:shadow-lg ";

  let vid1InfoOpen = false;
  let vid2InfoOpen = false;
</script>

<SvelteToast />

<div class="flex min-h-screen items-center justify-center bg-gray-800 p-3">
  <div
    class="sm w-[510px] rounded-lg border-4 bg-gray-900 p-4 text-left shadow-lg sm:p-6"
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
        <a href="https://github.com/jaxernst" target="_blank" class=" h-6 w-6"
          ><GithubLogo /></a
        >
        <a
          href="https://twitter.com/yachtyyachty"
          target="_blank"
          class="h-6 w-6"><TwitterLogo /></a
        >
        <a
          href="https://www.linkedin.com/in/jackson-ernst-9ab68014a/"
          target="_blank"
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
        <button
          in:receive={{ key: "about" }}
          out:send={{ key: "about" }}
          on:click={() => toggleSection("about")}
          class={"col-start-1 row-start-1 " +
            sectionStyle +
            hoverEffectIfClosed("about") +
            (isActive("about") ? activeSectionTw : " text-dark-white ")}
        >
          <div>
            <h2 class={sectionHeader}>About</h2>
          </div>

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
                decentralized technology. I am driven my desire to understand
                complex systems, and I'm particularly fascinated by the
                challenges presented and solved by blockchain technology.
              </p>

              <p class="p-2">
                I am deeply familiar with the Ethereum ecosystem and the
                technology stacks that power it. I have experience building
                within many layers of this ecosystem stack, from creating
                beautiful user interfaces to developing and maintaining
                meta-transaction execution infrastructure for a novel MEV
                capture protocol.
              </p>
              <p class="p-2">
                I'm always down for a challenge and I never stop learning {":)"}
              </p>
            </div>
          {/if}
        </button>
      {/key}

      <!-- Skillset Section -->
      {#key $activeSection}
        <button
          in:receive={{ key: "skillset" }}
          out:send={{ key: "skillset" }}
          on:click={() => toggleSection("skillset")}
          class={"row-start-1 " +
            sectionStyle +
            hoverEffectIfClosed("skillset") +
            (isActive("skillset")
              ? "z-10 col-span-3 col-start-1 bg-gray-900 shadow-lg "
              : "col-start-2 text-dark-white")}
        >
          <div class="flex justify-between">
            <h2 class={sectionHeader}>Skillset</h2>
            {#if isActive("skillset")}
              <div
                class="flex content-stretch justify-end gap-3 p-1 text-[11px]"
              >
                <div class="flex gap-1 text-green-600">
                  <div class="green-600 h-2 w-2 rounded-full bg-green-600" />
                  Advanced
                </div>
                <div class="flex gap-1 text-violet-500">
                  <div class="h-2 w-2 rounded-full bg-violet-500" />
                  Proficient
                </div>
                <div class="flex gap-1 text-pink-500">
                  <div class="h-2 w-2 rounded-full bg-pink-500" />
                  Actively learning
                </div>
              </div>
            {/if}
          </div>

          {#if isActive("skillset")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain / 2,
                easing: sineInOut,
              }}
              out:slide={{ duration: 100 }}
            >
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
        </button>
      {/key}

      <!-- Education Section -->
      {#key $activeSection}
        <button
          in:receive={{ key: "education" }}
          out:send={{ key: "education" }}
          on:click={() => toggleSection("education")}
          class={"row-start-1 " +
            hoverEffectIfClosed("education") +
            sectionStyle +
            (isActive("education")
              ? "z-10 col-span-3 col-start-1 bg-gray-900 shadow-lg "
              : "col-start-3 text-dark-white")}
        >
          <div>
            <h2 class={sectionHeader}>Education</h2>
          </div>

          {#if isActive("education")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain / 2,
                easing: sineInOut,
              }}
              out:slide={{ duration: 100 }}
            >
              <p class="text-[11px]"><i>Sep. 2017 - May 2021</i></p>
              <p class="font-bold text-dark-white">
                B.S. Aerospace Engineering
              </p>
              <h class="text-lg font-bold">
                California Polytechnic State University
              </h>
              <p>San Luis Obispo, CA</p>

              <p class="mt-3">
                <span class="font-bold text-dark-white"
                  >Featured Coursework:</span
                >
                <i>
                  Computational Fluid Dynamics | Statistical Methods in
                  Engineering | Linear Analysis | Calculus Series (I-IV) |
                  Technical Writing for Engineers | System Engineering Design
                </i>
              </p>
            </div>
          {/if}
        </button>
      {/key}

      <!-- Experience Section -->
      {#key $activeSection}
        <button
          in:receive={{ key: "experience" }}
          out:send={{ key: "experience" }}
          on:click={() => toggleSection("experience")}
          class={"row-start-2 " +
            sectionStyle +
            hoverEffectIfClosed("experience") +
            (isActive("experience")
              ? "z-10 col-span-3 col-start-1 row-start-1 bg-gray-900 shadow-lg "
              : "col-start-1 text-dark-white")}
        >
          <div>
            <h2 class={sectionHeader}>Experience</h2>
          </div>

          {#if isActive("experience")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain,
                easing: sineInOut,
              }}
              out:slide={{ duration: 400 }}
            >
              <div class="mx-1 my-4">
                <p class="text-dark-white"><i>Hello World Labs</i></p>
                <div class="md:flex md:justify-between">
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
                    interfaces between an Elixir-based backend, a Preact UI, and
                    an ENS + NFT aggregation middleware
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
        </button>
      {/key}

      <!-- Projects Section -->
      {#key $activeSection}
        <button
          in:receive={{ key: "projects" }}
          out:send={{ key: "projects" }}
          on:click={() => toggleSection("projects")}
          class={"row-start-2 " +
            sectionStyle +
            hoverEffectIfClosed("projects") +
            (isActive("projects")
              ? "z-10 col-span-3 col-start-1 row-start-1 bg-gray-900 shadow-lg "
              : "col-start-2 text-dark-white")}
        >
          <div>
            <h2 class={sectionHeader}>Projects</h2>
          </div>

          {#if isActive("projects")}
            <div
              in:slide={{
                duration: 400,
                delay: durationMain,
                easing: sineInOut,
              }}
              out:slide={{ duration: 400 }}
              class="p-2"
            >
              <div>
                <div class="my-2 flex gap-2">
                  <a
                    href="https://github.com/jaxernst/the-social-commitment-protocol"
                    class=" flex hover:underline"
                    target="_blank"
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
                  The Social Commitment Protocol is a set of smart contracts and
                  smart contract libraries I developed to facilitate onchain
                  social 'commitments'. A commitment, by definition, is a
                  promise or agreement to do <i>something</i> in the future. The
                  protocol provides the primitives and tools needed to build dapps
                  designed to help users be the best version of themselves.
                </p>
              </div>
              <div class="pt-2">
                <div class="my-2 flex gap-2">
                  <a
                    href="https://prop.house/juicebox/open-funding-round-1/4921"
                    class=" flex hover:underline"
                    target="_blank"
                  >
                    <h1 class="text-lg font-bold text-dark-white">
                      The Social Alarm Clock
                    </h1>
                    <div class="h-4 w-4 stroke-dark-white">
                      <ExternalLinkLogo />
                    </div>
                  </a>
                </div>
                <p>
                  The Social Alarm Clock is the first MVP dapp I am developing
                  on top of the Social Commitment Protocol. The idea of the app
                  is simple: Two users/friends/strangers (who want to wake up
                  earlier) can enter into an 'alarm clock' bet with eachother,
                  where they both agree on a wakeup time for specific days of
                  the week. Every morning, they must submit onchain 'wakeup'
                  confirmations before their alarm time to prove they are awake.
                  If a user misses an alarm, a portion of their bet gets lost to
                  the other player.
                </p>

                <p class="pt-2">
                  Recently, I submitted a proposal for the Social Alarm Clock to
                  a Juicebox DAO open funding round hosted by the Nouns Prop
                  House, and the community seemed to like the idea because my
                  proposal won 1st place!
                </p>
                <p class="pt-2">
                  The full proposal can be read <a
                    class="font-bold text-dark-white hover:underline"
                    href="https://prop.house/juicebox/open-funding-round-1/4921"
                    target="_blank">here</a
                  >
                </p>
              </div>
              <div class="pt-2">
                <div class="my-2 flex gap-2">
                  <a
                    href="https://digital-journey-hub.vercel.app/"
                    class=" flex hover:underline"
                    target="_blank"
                  >
                    <h1 class="text-lg font-bold text-dark-white">
                      Digital Boids
                    </h1>
                    <div class="h-4 w-4 stroke-dark-white">
                      <ExternalLinkLogo />
                    </div>
                  </a>
                </div>
                <p>
                  Boid's algorithm is a simple algorithm that explores the
                  nature of flocking behavior. The algorithmn presents three
                  simple rules that yield fascinating emergent behavior:
                </p>

                <p class="pl-1 pt-2">
                  1. Separation: steer to avoid crowding local flockmates
                </p>
                <p class="pl-1 pt-1">
                  2. Alignment: steer towards the average heading of local
                  flockmates
                </p>
                <p class="pl-1 pt-1">
                  3. Cohesion: steer to move toward the average position of
                  local flockmates
                </p>

                <p class="pt-2">
                  With these 3 rules, a implemented the alogrithm and created
                  this web app as an interactive canvas.
                </p>

                <p class="pt-2">
                  Recently, I submitted a proposal for the Social Alarm Clock to
                  a Juicebox DAO open funding round hosted by the Nouns props
                  house, and the community seemed to like the idea because my
                  proposal won 1st place!
                </p>
              </div>
              <div class="pt-2">
                <div class="my-2 flex gap-2">
                  <a
                    href="https://digital-journey-hub.vercel.app/"
                    class=" flex hover:underline"
                    target="_blank"
                  >
                    <h1 class="text-lg font-bold text-dark-white">
                      Genetic Arbitrage Trading System
                    </h1>
                    <div class="h-4 w-4 stroke-dark-white">
                      <ExternalLinkLogo />
                    </div>
                  </a>
                </div>
                <p>
                  As I became interested in the world of trading and DeFi, I
                  became fascinated with the idea of arbitrage. At the time, I
                  was spending a vast majority of my time tinkering in Python
                  building small toy projects. One day I stumbled upon a
                  research paper detailing a genetic selection algorithm that
                  could be used to identify profitable, multi-leg arbitrage
                  trades. <a
                    target="_blank"
                    class="text-dark-white"
                    href="https://www.scirp.org/html/9-9900153_22082.htm"
                  >
                    (source)</a
                  >
                </p>
                <p class="pt-2">
                  This project implements this algorithm while integrating it
                  into a trading system I developed to automated the execution
                  of trades identified by the algorithm.
                </p>
              </div>
            </div>
          {/if}
        </button>
      {/key}
    </div>

    <h1 class="pb-2 pt-6 text-lg font-bold">Featured</h1>

    <!-- Highlights Section -->
    <div class="flex gap-1 overflow-x-auto">
      <div
        class={" z-50 m-2 flex min-w-[220px] flex-col overflow-hidden rounded-2xl border border-dark-white bg-grey-trans text-left" +
          " transition duration-500 hover:scale-105 hover:bg-dark-white hover:shadow-2xl"}
      >
        <video
          id="vid1"
          autoplay
          loop
          muted
          playsinline
          style="height:100px; width:220px"
          class="object-cover"
          src={"boid-demo.mp4"}
        />
        <button
          on:click={() => (vid1InfoOpen = !vid1InfoOpen)}
          class="my-1 flex w-full flex-grow items-center px-3 text-left text-xs font-bold text-white"
        >
          <div class="grid">
            {#if vid1InfoOpen}
              <div
                transition:fade
                class="col-start-1 row-start-1 flex flex-grow items-center justify-between gap-4"
              >
                <a
                  href="https://digital-boids.vercel.app/"
                  target="_blank"
                  class="rounded-md border bg-dark-white p-1 transition hover:scale-110"
                  >Website</a
                >
                <a
                  href="https://github.com/jaxernst/svelte-boids"
                  target="_blank"
                  class="rounded-md border bg-dark-white p-1 hover:scale-110"
                  >Source Code</a
                >
              </div>
            {:else}
              <div class="col-start-1 row-start-1">
                <p>Boids</p>
                <p style="font-size:9px;">Interactive Flocking</p>
              </div>
            {/if}
          </div>
        </button>
      </div>

      <div
        class={" z-50 m-2 flex-shrink-0 overflow-hidden rounded-2xl border border-dark-white bg-grey-trans text-left" +
          " transition duration-500 hover:scale-105 hover:bg-dark-white hover:shadow-2xl"}
      >
        <video
          id="vid2"
          style="height:100px; width:190px;"
          class="object-cover"
          autoplay
          loop
          muted
          playsinline
          src={"sac-demo.mp4"}
        />
        <div class="w-ful px-3 py-1 text-xs font-bold text-white">
          <a
            target="_blank"
            href="https://prop.house/juicebox/open-funding-round-1/4921"
          >
            <p>Social Alarm Clock</p>
            <p style="font-size:9px;">Winning Prop House proposal</p>
          </a>
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
