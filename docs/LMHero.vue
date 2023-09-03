<template>
  <div class="hero">
    <img src="/lmql.svg" alt="LMQL" />
    <div>
    <h1>
      <img src="/lmql.svg" alt="LMQL" /><slot name="title"></slot><br/>
    </h1>
    <h2 class="tagline">
      <slot name="subtitle"></slot>
    </h2>
    <button class="primary btn">
      Get Started
    </button>
    <button class="btn">
      Contribute
    </button> 
    </div>
  </div>
</template>

<style scoped>
img {
  display: inline;
  height: 130pt;
  position: relative;
  top: -15pt;
  margin-right: 15pt;

  transform: translateX(0);
}

h1, h2 {
  font-size: 2.5em;
  line-height: 1.2em;
  border: none;
  margin: 0;
  padding: 0;
  font-weight: 550;
}

h2 {
  font-size: 1.2em;
  margin-top: 10pt;
  font-weight: 500;
  color: rgb(86, 86, 86);
}

html.dark h2 {
  color: rgb(183, 183, 183);
}
.hero {
  margin: auto;
  display: flex;
  margin-top: 70pt;
  width: 100%;
  max-width: 650pt;
  text-align: left;
  align-items: center;
  justify-content: center;
  padding: 20pt;
}

.hero h1>img {
  display: none;
}

</style>
<style>
button.btn {
  padding: 4pt 10pt;
  font-size: 1.0em;
  background-color: rgb(220, 220, 220);
  border-radius: 4pt;
  font-weight: bold;
  margin: 20pt 5pt 5pt 0pt;
  border: 2pt solid rgb(220, 220, 220);
}

button.btn:hover {
  border: 2pt solid rgb(192, 190, 190);
}

button.btn.primary, button.btn.primary:hover {
  background-color: rgb(91, 111, 241);
  border: 2pt solid rgb(91, 111, 241);
  color: white;
}

html.dark button.btn {
  background-color: rgb(40, 40, 40);
  border: 2pt solid rgb(40, 40, 40);
}

html.dark button.btn:hover {
  border: 2pt solid rgb(60, 60, 60);
}

html.dark button.btn.primary, html.dark button.btn.primary:hover {
  background-color: rgb(91, 111, 241);
  border: 2pt solid rgb(91, 111, 241);
  color: white;
}

@media (max-width: 600px) {
  .hero h1 {
    font-size: 1.5em;
  }
  .hero h2 {
    font-size: 1.2em;
  }
  .hero {
    margin: 10pt 0pt !important;
    align-items: flex-start !important;
  }

  .hero button {
    margin-top: 10pt;
    margin-bottom: 0pt;
  }

  .hero img {
    width: 40pt;
    display: none;
  }

  .hero h1>img {
    display: inline !important;
    margin: 0;
    padding: 0;
    position: relative;
    height: 1em;
    top: 2.5pt;
    margin-right: -5pt;
    margin-left: -8pt;
  }
}
</style>