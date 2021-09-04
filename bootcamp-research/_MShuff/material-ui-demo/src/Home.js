import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import MyCard from './MyCard';
import { useDogs } from './hooks/dogs';
import { useCats } from './hooks/cats';

/**
 * Displays the Home Component
 * @param props - The component properties
 * @component
 */
const Home = () => {
  // These are custom React Hooks
  const cats = useCats();
  const dogs = useDogs();

  return (
    <Grid
      container
      spacing={10}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item>
        <Typography variant="h4" color="primary">Cats</Typography>
        {cats.map((cat) => (
          <MyCard
            key={cat.id}
            title={cat.id}
            subheader="This is a cat, isn't it cute?"
            image={cat.url}
          >
            <p>{cat.url}</p>
          </MyCard>
        ))}
      </Grid>
      <Grid item>
        <Typography variant="h4" color="secondary">Dogs</Typography>
        {dogs.map(dog => (
          <MyCard
            key={dog}
            title={dog}
            subheader="This is a dog!"
            image={dog}
          />
          ))}
      </Grid>
    </Grid>
  );
}

export default Home;