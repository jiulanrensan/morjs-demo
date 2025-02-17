// behavior3.js
export default Behavior({
  methods: {
    b3 () {
      // ...
    }
  },
  definitionFilter(defFields, definitionFilterArr) {
    console.log('defFields 3', defFields);
    console.log('definitionFilterArr 3', definitionFilterArr);
  },
})