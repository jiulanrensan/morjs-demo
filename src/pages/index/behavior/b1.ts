// behavior1.js
import b2 from './b2'
export default Behavior({
  behaviors: [b2],
  methods: {
    b1 () {
      // ...
    }
  },
  definitionFilter(defFields, definitionFilterArr) {
    // defFields 就是 当前的 behavior 被使用的对象
    console.log('defFields 1', defFields);
    // definitionFilterArr 就是behaviors字段对应的数组
    console.log('definitionFilterArr 1', definitionFilterArr);
    
  },
})