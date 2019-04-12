<template>
  <table-base :table-name="tableName"></table-base>
</template>
<script>
import TableBase from "../../views/common/tableBase";
export default {
  name: "User",
  components: { TableBase },
  data() {
    return {
      tableName: "User"
    };
  }
};
</script>
