<script>
import { reactive } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

export default {
  created() {
    ChartJS.register(ArcElement, Tooltip, Legend);
  },
  data() {
    return {
      chartData: {
        labels: [],
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#AABB16",
              "#CCEE10",
            ],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  components: { Pie },
  async mounted() {
    const apis = await this.getApi();
    apis.forEach((elt) => {
      this.chartData.labels = [...this.chartData.labels, elt.license];
      this.chartData.datasets[0].data = [
        ...this.chartData.datasets[0].data,
        elt.total,
      ];
    });
  },
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
  methods: {
    async getApi() {
      return await fetch(`http://localhost:3000/api`).then((r) => r.json());
    },
  },
};
</script>

<template>
  <Suspense>
    <Pie
      v-if="chartData.labels.length"
      id="my-chart-id"
      :data="chartData"
      :options="chartOptions"
    />
  </Suspense>
</template>
