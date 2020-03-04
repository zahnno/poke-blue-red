foam.CLASS({
  name: 'Welcome',
  extends: 'foam.u2.Controller',

  imports: [
    'dialog',
    'stack'
  ],

  css: `
  ^ {
    display: flex;
    justify-content: center;
  }
  .input-text {
    min-height: 65px;
    margin-top: 20px;
  }
  .label {
    text-align: center;
  }
  ^ img {
    cursor: pointer;
  }
  `,

  properties: [
    ['inc', 0],
    {
      class: 'String',
      label: 'Enter your name here',
      name: 'firstName',
      view: {
        class: 'foam.u2.TextField',
      }
    },
    {
      class: 'Array',
      name: 'dialogSequence',
      factory: function() {
      return [
          `I'm professor Oak.`,
          'I heard you were looking for a Pokemon!',
          `Your very own tale of grand adventure is about to unfold.`,
          `But first...`,
          'What is your name?'
        ]
      }
    },
    {
      class: 'Array',
      name: 'secondDialogSequence',
      factory: function() {
        return [
          `? Wonderful! That's a great name!`,
          `Let's take a look at the Pokemon we have...`
        ]
      }
    },
    'secondSequence'
  ],

  methods: [
    function initE(){
      var self = this;
      setTimeout(function() {
        self.dialog = 'Hello there!'
      }, 2000);
      this.start()
        .addClass(this.myClass())
        .start('img')
          .addClass('fade-in')
          .on('click', () => {
            if ( this.secondSequence != true) {
              if ( this.dialogSequence.length === this.inc ) return
              if ( this.inc == 0 ) {
                var audio = document.createElement('audio');
                audio.src = 'oak11.wav'
                audio.play();
              }
              this.dialog = this.dialogSequence[this.inc];
              this.inc++;
            } else {
              if ( this.secondDialogSequence.length === this.inc ) {
                this.stack.push({ class: Pokemon, firstName: this.firstName });
              }
              this.dialog = this.secondDialogSequence[this.inc];
              this.inc++;
            }
          })
          .attrs({
            src: 'prof-oak.png'
          })
        .end()
      .end()
      this.start().addClass('input-text')
        .add(this.slot(function(dialogSequence, inc) {
          if ( dialogSequence.length == inc ) {
            return self.E()
              .start().addClass('input').addClass('fade-in')
                .start().addClass('label').add(self.FIRST_NAME.label).end()
                .start(self.FIRST_NAME).attrs({ 'autocomplete':'off'}).end()
              .end();
          }
        }))
      .end()
      this.document.addEventListener('keyup', function(e) {
        if (e.keyCode === 13 ) {
          self.inc = 0;
          self.dialog = self.firstName + self.secondDialogSequence[0];
          self.secondSequence = true;
          self.inc++;
          var audio = document.createElement('audio');
          audio.src = 'oak6.wav'
          audio.play();
        }
      });
    }
  ]
});
