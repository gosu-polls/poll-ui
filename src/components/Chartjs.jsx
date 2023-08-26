import React from "react";
// import Layout from "./Layout";
import { Grid, Header, Statistic } from "semantic-ui-react";
import JSONdata from "./report.json";
import { Bar } from "react-chartjs-2";

const DashboardBarChart = () => {
  const data = {
    labels: JSONdata.barChart[0].labels,
    datasets: JSONdata.barChart[1].datasets,
    options: JSONdata.barChart[2].options
  };
  return <Bar data={data} />;
};

class Dashboard extends React.PureComponent {
  renderDashboardStatistics = () => {
    return JSONdata.statistics.map(item => {
      return (
        <Statistic key={item.id}>
          <Statistic.Value>{item.value}</Statistic.Value>
          <Statistic.Label>{item.id}</Statistic.Label>
        </Statistic>
      );
    });
  };

  render() {
    return (
        <>
    {/* <Layout {...this.props}> */}
        <Header as="h2">Dashboard</Header>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h4" dividing>
                Monthly users
              </Header>
              <DashboardBarChart />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h4" dividing>
                Statistics
              </Header>
              <Statistic.Group size="small">
                {this.renderDashboardStatistics()}
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    {/*  </Layout> */}
    </>
    );
  }
}

export {Dashboard}