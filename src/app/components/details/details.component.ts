import { AfterViewInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { GamesService } from 'src/app/services/games.service';
declare var google: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  gameId!: string;
  game!: Game;
  routeSub: Subscription | undefined;
  gameSub: Subscription | undefined;

  @ViewChild('pieChart')
  pieChart!: ElementRef; 

  constructor(private activatedRoute: ActivatedRoute, private gamesService: GamesService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string): void {
    this.gameSub = this.gamesService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp;
    });
  }

  drawchart(id: string): void {
    this.gameSub = this.gamesService.getGameDetails(id).subscribe((gameResp: Game) => {
    const data = google.visualization.arrayToDataTable([
        ['Title', 'Count'],
        [gameResp.ratings[0].title, gameResp.ratings[0].count],
        [gameResp.ratings[1].title, gameResp.ratings[1].count],
        [gameResp.ratings[2].title, gameResp.ratings[2].count],
        [gameResp.ratings[3].title, gameResp.ratings[3].count],
      ]);
    const options = {
      title: 'Videogame Ratings',
      legend: { position: 'top' },
      is3D: true,
    };

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  });
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawchart(this.gameId));
  }
}
