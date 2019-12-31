export default {
  props: {},
  methods: {
    afterCheckChanged(node, path) {
      // update parent
      const nodes = this.getAllNodesByPath(path)
      const reversedParents = nodes.slice(0, nodes.length - 1)
      reversedParents.reverse()
      for (const parent of reversedParents) {
        this.$set(parent, '$checked', parent.children.every(child => child.$checked))
      }
      // update children
      if (node.children && node.children.length > 0) {
        this.walkTreeData(node.children, (childNode) => {
          this.$set(childNode, '$checked', node.$checked)
        })
      }
    },
    check(node, path) {
      this.$set(node, '$checked', true)
      this.afterCheckChanged(node, path)
    },
    uncheck(node, path) {
      this.$set(node, '$checked', false)
      this.afterCheckChanged(node, path)
    },
    toggleCheck(node, path) {
      // node.$checked is checked by vmodel, so don't change it again, just make it reactive
      this.$set(node, '$checked', node.$checked)
      this.afterCheckChanged(node, path)
    },
    setCheckedOfAllNodes(to, nodeOrNodes = this.treeData) {
      this.walkTreeData(nodeOrNodes, (childNode) => {
        this.$set(childNode, '$checked', to)
      })
    },
  },
}
