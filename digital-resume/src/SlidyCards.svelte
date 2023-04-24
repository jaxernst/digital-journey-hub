<script>
  import { Slidy } from "svelte-slidy";
  import cards from "./cards.js";

  let name = "Slidy";

  const slidy_cards = {
    slides: cards,
    wrap: {
      id: "slidy_cards",
      width: "100vw",
      height: "100vh",
      padding: "50px 0 50px",
      align: "middle",
      alignmargin: 0,
    },
    slide: {
      gap: 50,
      width: "80vw",
      height: "100vh",
      backimg: false,
      imgsrckey: "src",
      objectfit: "contain",
    },
    controls: {
      dots: true,
      dotsnum: true,
      dotsarrow: true,
      dotspure: true,
      arrows: false,
      keys: true,
      drag: true,
      wheel: true,
    },
    options: {
      axis: "x",
      loop: true,
      duration: 350,
    },
  };
</script>

<Slidy
  {...[
    {
      id: 1,
      header: "Digital Boid",
      text: "Digital BOids is an interactive flocking simulation.",
      src: "/assets/digital-boids-preview.png",
    },
  ]}
  let:item
>
  <div class="slide">
    <img alt={item.header} src={item.src} />
    <article>
      <h2>{item.header}</h2>
      <p>
        {item.text}
      </p>
    </article>
  </div>
</Slidy>

<style>
  @media screen and (min-width: 500px) {
    :global(#slidy_cards .slidy-ul li) {
      width: 70vw;
    }
  }
  @media screen and (min-width: 600px) {
    :global(#slidy_cards .slidy-ul li) {
      width: 50vw;
    }
  }
  @media screen and (min-width: 700px) {
    :global(#slidy_cards .slidy-ul li) {
      width: 33vw;
    }
  }
  :global(#slidy_cards .slidy-ul li img) {
    transform: scale(1);
    transition: transform 350ms, box-shadow 350ms;
  }
  :global(#slidy_cards .slidy-ul li) {
    overflow: visible;
  }
  :global(#slidy_cards .slidy-ul li.active img) {
    transform: scale(1.15);
    box-shadow: 0 14px 25px rgba(0, 0, 0, 0.36);
  }
  :global(body) {
    margin: 0;
    padding: 0;
  }
  .slide {
    position: relative;
    display: flex;
    flex-flow: column;
    text-align: center;
    align-content: center;
    justify-content: center;
    height: 100%;
    border-radius: 1rem;
  }
  .slide img {
    max-height: 200px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    object-fit: cover;
    position: relative;
    z-index: 1;
    border-radius: 1rem;
    box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
  }
  .slide article {
    padding: 1rem;
  }
  h1 {
    text-align: center;
  }
  h1 span {
    color: red;
  }
</style>
