
import { DictMatcher } from "cypress/types/net-stubbing";


export interface QueryParams {
    [index: string] : any;
}

export class RequestBuilder {
    private options: Partial<Cypress.RequestOptions> = {};

    public withParams(params: object) {
        this.options.qs = params;
        return this;
    }

    public withError() {
        this.options.failOnStatusCode = false;
        return this;
    }

    public to(pathname: string) {
        this.options.url = pathname;
        return this;
    }

    public withHeaders(headers: object) {
        console.log(headers);
        this.options.headers = headers;
        return this;
    }

    public withBody(body : string|object) {
        this.options.body = body;
        return this;
    }

    private makeRequest<T>() : Cypress.Chainable<Cypress.Response<any>> {
        return cy.request(this.options);
    }

    public get<T>() {
        this.options.method = 'GET';
        console.log('making GET request to ', this.options.url, this.options.qs);
        return this.makeRequest<T>();
    }

    public post<T>() {
        this.options.method = 'POST';
        console.log('making POST request to ', this.options.url, this.options.body);
        return this.makeRequest<T>();
    }

    public delete<T>() {
        this.options.method = 'DELETE';
        console.log('making DELETE request to ', this.options.url, this.options.body);
        return this.makeRequest<T>();
    }
}

function paramValuesToString(params: QueryParams) {
    return Object.keys(params).reduce<DictMatcher<string>>((acc, key) => {
        acc[key] = String(params[key]);
        return acc;
    }, {});
}