foam.CLASS({
  name: 'Pokemon',
  extends: 'foam.u2.Controller',

  imports: [
    'dialog',
    'stack'
  ],

  css: `
    ^ {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ^ img {
      width: 200px;
      cursor: pointer;
      transition: width 0.5s;
    }
    ^ img:hover {
      position: relative;
      width: 225px;
    }
    ^ .buffer {
      height: 255px;
      width: 225px;
      margin-right: 40px;
    }
    .selection{
      display: flex;
      justify-content: center;
      font-size: 36px;
      height: 40px;
    }
  `,

  properties: [
    {
      class: 'String',
      name: 'hoverSelect',
      value: ''
    },
    'pokemonSelect',
    'firstName'
  ],

  methods: [
    function initE() {
      var self = this;

      setTimeout(function() {
        self.dialog = 'Oh, looks like we only have three pokemon left. Charmander, Squirtle and Bulbasaur.'
        setTimeout(function() {
          self.dialog = 'Choose which ever one suits you best!'
        }, 8000)
      }, 2000);

      this.start().addClass(this.myClass()).addClass('fade-in')
        .start().addClass('buffer')
          .on('mouseover', function() {
            self.hoverSelect = 'Charmander';
          })
          .on('mouseleave', function() {
            self.hoverSelect = '';
          })
          .on('click', function() {
            self.pokemonSelect('Charmander');
          })
          .start('img').attrs({
            src: 'charmander.png'
          }).end()
        .end()
        .start().addClass('buffer')
          .style({'padding-top':'30px;'})
          .on('mouseover', function() {
            self.hoverSelect = 'Squirtle';
          })
          .on('mouseleave', function() {
            self.hoverSelect = '';
          })
          .on('click', function() {
            self.pokemonSelect('Squirtle');
          })
          .start('img').attrs({
            src: 'squirtle.png'
          }).end()
        .end()
        .start().addClass('buffer')
          .on('mouseover', function() {
            self.hoverSelect = 'Bulbasaur';
          })
          .on('mouseleave', function() {
            self.hoverSelect = '';
          })
          .on('click', function() {
            self.pokemonSelect('Bulbasaur');
          })
          .start('img')
          .style({'padding-top':'35px'}).attrs({
            src: 'bulbasaur.png'
          }).end()
        .end()
      .end();
      this.start().addClass('selection')
        .add(this.slot(function(hoverSelect) {
          if ( hoverSelect != '' ) {
            return self.E()
              .start().addClass('fade-in')
                .start().add(self.hoverSelect).end()
              .end();
          }
        }))
      .end();
    },
    function pokemonSelect(pokemon) {
      this.stack.push({ class:'PokemonSelected', pokemon: pokemon, firstName: this.firstName });
    }
  ]
});
