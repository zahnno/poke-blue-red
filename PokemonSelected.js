foam.CLASS({
  name: 'PokemonSelected',
  extends: 'foam.u2.Controller',

  imports: [
    'dialog'
  ],

  css: `
    ^ {
      position: relative;
      bottom: 50px;
      margin: auto;
      width: 60%;
    }
    ^ img {
      width: 250px;
      margin-top: 50px;
    }
  `,

  properties: [
    'firstName',
    'pokemon'
  ],

  methods: [
    function initE() {
      var audio = document.createElement('audio');
      audio.src = 'opening.mp3'
      audio.play();
      this.dialog = '';
      this.start().addClass(this.myClass()).addClass('fade-in')
        .start('h3').add(`Congratulations ${this.firstName}!`).end()
        .start('h3').add(`I hope you enjoy bringing life to ${this.pokemon}. Have fun painting :)`).end()
        .start('img').attrs({
          src: this.pokemon + '.png'
        }).end()
      .end();
    }
  ]
});
