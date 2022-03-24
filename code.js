const { widget } = figma
widget.register(function ErrorWidget() {
  throw new Error("This widget template uses Typescript. Follow the instructions in README.md to build this file.")
})
