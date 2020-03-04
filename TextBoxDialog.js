foam.CLASS({
  name: 'TextBoxDialog',
  extends: 'foam.u2.View',

  css: `
    ^ {
      min-height: 55px;
      display: inline-flex;
    }
    ^ .latent-text {
      font-family: 'Comic Sans MS';
      border: 1px solid lightgrey;
      border-radius: 5px;
      padding: 15px;
      display: inline-flex;
      box-shadow: 2px 1px 7px gainsboro;
    }
  `,

  properties: [
    {
      class: 'String',
      name: 'text'
    },
    {
      class: 'String',
      name: 'latentText',
      value: ''
    },
    {
      class: 'Int',
      name: 'inc',
      value: 0
    },
    {
      class: 'Int',
      name: 'intervalTime',
      value: 60
    },
    'interval'
  ],

  methods: [
    function initE() {
      this.text$.sub(this.lis);
      this.start().addClass(this.myClass())
        .start().show(this.latentText$.map((str) => str.length > 0)).addClass('latent-text')
          .add(this.latentText$)
        .end()
      .end();
    }
  ],

  listeners: [
    function lis() {
      this.inc = 0;
      this.latentText = '';
      this.interval = setInterval(this.timeTick, this.intervalTime);
    },
    function timeTick() {
      if ( this.latentText.length == this.text.length ) return clearInterval(this.interval);
      this.latentText += this.text[this.inc];
      this.inc++;
    }
  ]

});
