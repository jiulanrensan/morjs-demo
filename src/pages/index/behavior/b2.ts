// behavior2.js
import b3 from './b3'
export default Behavior({
  behaviors: [b3],
  methods: {
    b2 () {
      // ...
    }
  },
  definitionFilter(defFields, definitionFilterArr) {
    // definitionFilterArr[0](defFields)
    console.log('defFields 2', defFields);
    console.log('definitionFilterArr 2', definitionFilterArr);
  },
})