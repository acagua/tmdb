import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`;


const Movie = styled.div`
    background: white;
    border: 3px solid palevioletred;
    border-radius: 25px;
    margin: 20px 20px 20px 20px;
    flex: 1 0 25%;

`; 

const Poster = styled.img`
    text-align: center;
    width: 50%;
`; 

const Title = styled.h2`
    text-align: center;

`; 

const Date = styled.h4`
    text-align: center;
    color: gray;
`;

export class Movies extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loaded : false,
            movies: {}
        }
    }

    componentDidMount() {
        const request =  async ()=> {
            try{

                const response = await fetch(`${process.env.REACT_APP_TMDB_API_BASE_URL}movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&region=FR`);
                const json = await response.json();
                this.setState({movies: json.results, loaded:true})
            }
            catch (err){
                throw new Error('se toteo')
            }

            console.log(this.state.movies)
            
        }

        request();

    }
  
    componentWillUnmount() {

    }
  
    render () {
        if(!this.state.loaded){
            return <Container>Cargando...</Container>
        } 

        return (
            <Container>
                {
                    this.state.movies.map( (movie, index) => (
                        <Movie key={index}>
                            <Title>
                                {movie.title}
                            </Title>
                            <Poster src={`${process.env.REACT_APP_IMG_BASE_URL}${movie.poster_path}`}>

                            </Poster>
                            <Date>
                                Release date: {movie.release_date}
                            </Date>
                        </Movie>
                    )

                    )
                }
                
            </Container>
        )
    }



}