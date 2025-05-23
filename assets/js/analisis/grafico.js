const Utils = {
  CHART_COLORS: {
    red: 'rgb(250, 7, 7)',
    blue: 'rgb(5, 245, 37)'
  }
};

// Generar datos
const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;

for (let i = 0; i < 1000; i++) {
  prev += 5 - Math.random() * 10;
  data.push({ x: i, y: prev });

  prev2 += 5 - Math.random() * 10;
  data2.push({ x: i, y: prev2 });
}

// Definir animación
const totalDuration = 10000;
const delayBetweenPoints = totalDuration / data.length;

const previousY = (ctx) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) return 0;
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) return 0;
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};

// Configuración del gráfico
const config = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Gastos',
        borderColor: Utils.CHART_COLORS.red,
        borderWidth: 1,
        radius: 0,
        data: data
      },
      {
        label: 'Ingresos',
        borderColor: Utils.CHART_COLORS.blue,
        borderWidth: 1,
        radius: 0,
        data: data2
      }
    ]
  },
  options: {
    animation,
    interaction: {
      intersect: false
    },
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        type: 'linear'
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }
};

// Ejecutar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('graficoAnalisis').getContext('2d');
  new Chart(ctx, config);
});





    