import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

// Here were are mostly using observables instead of promises
import { Observable } from 'rxjs/Observable';

//import * as _ from 'lodash';

import { IConnection } from './connection.model';
import { IConnectionService } from './connection.service.interface';

import { Logger } from '../common/service/log';

let log = Logger.get('ConnectionService');

@Injectable()
export class ConnectionService implements IConnectionService {

  errorMessage: string;
  private allConnections: IConnection[];

  baseUrl: string;
  //private connectionsUrl = 'app/+connections/connection.data.json'; // URL to JSON file
  //private connectionsUrl = 'http://localhost:9090';


  /**
   * Constructor.
   * @param http - HTTP
   */
  constructor(private http: Http) {
    //private connectionsUrl = 'app/+connections/connection.data.json'; // URL to JSON file
    this.baseUrl = 'http://localhost:9090';
  }


  /**
   * Creates a Connection using data provided by the user.
   * @param connection - Connection
   * @return {Promise<Connection>} - Returns a Promise. Should perhaps return an Observable instead.
   */
  create(connection: IConnection): Promise<IConnection> {
    return;
  };


  /**
   * Deletes a Connection. This does not delete the Connection persistently. It removes
   * the Connection from the list of Connections in this session, for now.
   * @param id - ID of the Connection
   * @return {Promise<void>} - Returns a Promise. Should perhaps return an Observable instead.
   */
  del(id: number): Promise<void> {
    return;
  };


  /**
   * Gets a single Connection by its name.
   * This should actually be by ID instead, and needs to be updated.
   * @param id - ID of the Connection
   * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
   */
  get(id: number): Observable<IConnection> {
    return this.getAll()
      .map((connections: IConnection[]) => connections.find(c => c.id === id));
  };


  /**
   * Retrieves a list of all Connections. On the backend these are actually called Components.
   * Connections are actual instances of Components created by Users.
   * @return {Observable<Connection[]>} - Returns an Observable.
   */
  getAll(): Observable<IConnection[]> {
    return this.http.get(this.baseUrl + '/components')
      .map(this.extractData)
      .catch(this.handleError);
  };


  /**
   * Gets an Observable of recently updated Connections.
   * @return {Observable<Connection[]>} - Returns an Observable.
   */
  getRecent(): Observable<IConnection[]> {
    return;
  };


  /**
   * Gets the supported Component Groups, known as Connection Types to the User for this
   * implementation.
   * @return {string[]}
   */
  getSupportedConnectionTypes(): Observable<IConnection[]> {
    return this.http.get(this.baseUrl + '/component-groups')
      .map(this.extractData)
      .catch(this.handleError);
  };


  /**
   * Updates a single Connection.
   * Returns a Promise. Should perhaps return an Observable instead.
   * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
   */
  update(connection: IConnection): Promise<IConnection> {
    return;
  };


  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  };


  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg); // log to console instead

    return Observable.throw(errMsg);
  };

}

