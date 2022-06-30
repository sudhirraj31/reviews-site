import { GraphQLClient } from "graphql-request";

const endpoint =
  "https://api-ap-south-1.graphcms.com/v2/cl4v8djyj1e3g01t7b35mb1h7/master";

// for reviewer
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTYyNzEzMzMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDR2OGRqeWoxZTNnMDF0N2IzNW1iMWg3L21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjdmMWU4NDkyLTQxZDMtNDk0NC04MWY0LTFjNDdhYWU2MThhZiIsImp0aSI6ImNsNHZwNnM3NTFyZTIwMXVpYXpuN2dweW8ifQ.0-FJHt1J8nOJbs-_M4gpEmN-ho8ucciyX5KuVrvQoM6srzd2TijwB0qojtSATgfi7wmGfOXHXJAYNaCnBQg-8MruepPZ9dFF-EHM_TTT4bRuZ4uOIg4SZJ1Apspq35--EaVPCIpIQA01blt3DZoLwe6drUvoTCrgCSNLWwRksfuwM42uTkaq8KNWPdZP8Uxmg11Sn7OyJG0w0RBmC3zP--xK5GmFke9OsKYxxMadz53TBFo0CumZgLH5QXhBCocdjjKSSk-HNHGqlfZaAXHMwTQptG8Yu1gj4R-ZiGMx6LQW0alzet6H17LtN4BZPN2nlNodSv8LcQfnXrk8ROihs9XTLRvG_xL60t05ckIWjuiDZoGhtybmX0xa1Q3aivn-UBuxw01pzyZlFO7lJyZUAVtnn_CBIiV8LjbrqH1QLzT_RBUC-7p4zVxzdryLO6dw0OCXnCIHYYl_Qos0MG510Q-GF03M2MOvHCpI-eL2h_CUK4tppk6T1TMfErZ7BbttfixpKxniuePGmEedssx7vJAr1L8OpA9l3Xz3_Spz0T5s9eqpm7sDlA35V5TOVeL7pD8f9jN0ZVvrqxzpLTLNOo1k6Z92M8Hhx1FBqJku-hQEOkCJy0Xmori3feHQ3tHyIvc1SAY_LJBvLIgZt3gK4J4IGjskW_QfhcqKY9sQEsg";

export const graphcms = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
const adminToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTY0OTYwNzEsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDR2OGRqeWoxZTNnMDF0N2IzNW1iMWg3L21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjNkZDc0ODE3LTY5OWMtNDliNi04ZWUyLWUzNmIyNTY3NzY0ZSIsImp0aSI6ImNsNHplem90MDA1ZWUwMXVnNnI2ejFmYjIifQ.PvgxQvkTNDW_Pp5XTUFGsfsZinKf0JuectatKOpC8sgyjOhS0zzlYxo63aEnuSXcAMa9Etz1EBbO8X3CBSfEZ58Q_De-iDb8OPJVdh-xVyDkMlXOHF1i6chv1CCnnrpn9PjCkxDl-Vzz_dTVoQuauvWPfwBjJTXlqdT_RhSkuiOaBX3FEIcMEjWzHZxdJOMIXgdaVmvVbF5FM_JlgDxrFz6RXlEa1B9Q-v0YIlQsglVlwXtgILQ_xjjbw3ZyQb2BoiIDN4UUbYXRaShx_zVKJ2FPUgSAYc_1kLvVDe3Qmo4k7PXmcKEPg1YE-RIFePvsqbdUZR4uvlAXj7ec16uwnIdatLB288Gic6QsUuUpaTYfKgH3wm9M46tp2jejJTgxNI7CDYF3impklppBl496txKvSoLelONYfYzO3PA93rOsXFhu7uySfbn7sxDkiZkmsEi6dYcUZuSTeBOi6LfHJYHy0tqHH2pMtgrnHFEeuIDqUQaeBNWIY412pGSVwD9dWgCT4tU6L0JShn6lx02MhKdiu6bzSm3Lzu39widfJIA7Oxp3IwdOIMM78KkB7J66iDUhFstRw6_YvV6FoX6QZHWPiVZtMw1OZGIUCLme_fTRo0RPiopYPyn5Zv9tA37HefzePGmjLsROHc32eq5XXJgxF6XsoJIrccXjsiqM2p8";

// for admin
export const graphcmsAdmin = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${adminToken}`,
  },
});