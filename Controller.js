foam.CLASS({
  name: 'Controller',
  extends: 'foam.u2.Controller',

  requires: [
    'foam.u2.stack.Stack'
  ],

  exports: [
    'dialog',
    'stack'
  ],

  css: `
    body {
      font-family: 'Comic Sans MS';
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .fade-in {
      animation: fadeIn ease 5s;
    }
    .label {
      margin-bottom: 10px;
    }
    ^ .foam-u2-stack-StackView {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input {
      font-size: 24px;
      font-family: 'Comic Sans MS';
    }
    @keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }
    .foam-u2-TextField {
      border: none !important;
      text-align: center;
      border-bottom: 1px solid lightgray !important;
    }
  `,

  properties: [
    {
      class: 'String',
      name: 'name'
    },
    {
      name: 'stack',
      factory: function() { return this.Stack.create(); }
    },
    {
      name: 'dialog',
      value: ''
    },
    {
      name: 'textBox',
      factory: function() { return TextBoxDialog.create(); }
    }
  ],

  methods: [
    function initE() {
      this.start().addClass(this.myClass())
        .tag({
          class: 'TextBoxDialog',
          text$: this.dialog$
        }).addClass('fade-in')
        .tag({
          class: 'foam.u2.stack.StackView',
          data: this.stack,
          showActions: false
        })
      .end()
      this.stack.push(Welcome);
    }
  ]
});