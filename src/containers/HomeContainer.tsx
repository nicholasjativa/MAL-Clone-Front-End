import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Home } from '../components/Home/Home';
import { GoToAnimeAction, AnimeLoadedSuccessAction } from '../store/actions/AnimeActions';
import { HomeContainerProps } from '../interfaces/HomeContainerProps';
import { JikanService } from '../services/Jikan';

class HomeContainer extends Component<HomeContainerProps, {}> {

    public componentDidMount(): void {
        // temp fix for preventing API call when store already has data
        if (!this.props.inProgressAnime.length && !this.props.completedAnime.length) {
            const jikan = new JikanService();

            jikan.getUserCompletedAnime()
                .then((resp: any) => {
                    const anime: any[] = resp.anime;
                    this.props.dispatch(new AnimeLoadedSuccessAction({ anime, loadedType: "completed" }));
                });
            jikan.getUserDroppedAnime()
                .then((resp: any) => {
                    const anime: any[] = resp.anime;
                    this.props.dispatch(new AnimeLoadedSuccessAction({ anime, loadedType: 'dropped' }));
                });
            jikan.getUserOnHoldAnime()
                .then((resp: any) => {
                    const anime: any[] = resp.anime;
                    this.props.dispatch(new AnimeLoadedSuccessAction({ anime, loadedType: 'onHold' }));
                });
            jikan.getUserPlanToWatchAnime()
                .then((resp: any) => {
                    const anime: any[] = resp.anime;
                    this.props.dispatch(new AnimeLoadedSuccessAction({ anime, loadedType: 'planToWatch' }));
                });
            jikan.getUserWatchingAnime().
                then((resp: any) => {
                    const anime: any[] = resp.anime;
                    this.props.dispatch(new AnimeLoadedSuccessAction({ anime, loadedType: "inProgress" }));
                });
        }
    }

    public render(): JSX.Element {

        return (
            <Home
                inProgressAnime={this.props.inProgressAnime}
                completedAnime={this.props.completedAnime}
                droppedAnime={this.props.droppedAnime}
                onHoldAnime={this.props.onHoldAnime}
                planToWatchAnime={this.props.planToWatchAnime}
            />
        );
    }

}

const mapStateToProps = (state: any) => ({
    ...state.Anime
});

const mapDispatchToProps = (dispatch: Function) => ({
    GoToAnime: (id: string) => dispatch(new GoToAnimeAction(id))
});

export const HomeContainerComponent = connect(
    mapStateToProps,
    // mapDispatchToProps
)(HomeContainer);