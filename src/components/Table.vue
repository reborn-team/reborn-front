<template>
  <div id="table">
    <table>
      <colgroup>
        <col class="col1" />
        <col class="col2" />
        <col class="col3" />
        <col class="col4" />
        <col class="col5" />
      </colgroup>

      <tr>
        <th>Workout</th>
        <th>Set</th>
        <th>Rep</th>
        <th>Weight</th>
        <th>Total</th>
      </tr>
      
      <tr v-for="i in arr.length" :key="{ i }">
        <td>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              :value="arr[i - 1].workout"
              disabled
              />
          </div>
        </td>
        <td>
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              :value="arr[i - 1].set"
              min=0
              @change="(res) => changeValue(res, i - 1, 'set')"
            />
          </div>
        </td>
        <td>
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              :value="arr[i - 1].rep"
              min=0
              @change="(res) => changeValue(res, i - 1, 'rep')"
            />
          </div>
        </td>
        <td>
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              :value="arr[i - 1].weight"
              min=0
              @change="(res) => changeValue(res, i - 1, 'weight')"
            />
          </div>
        </td>
        <td>
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              :value="arr[i - 1].total"
              disabled
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import '../css/components/Table.css'

export default {
  name: "TheTable",
  props: ["arr", "changeValue"],
};
</script>

<style></style>
