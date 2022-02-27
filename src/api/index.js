import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

export const fetchShows = () => axios.get(`${baseUrl}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
export const fetchShowsBySearch = (inputValue) => axios.get(`${baseUrl}/search/tv?api_key=${API_KEY}&query=${inputValue}&language=en-US&page=1&include_adult=false`);
export const fetchFavoriteShows = (accountId, sessionId) => axios.get(`${baseUrl}/account/${accountId}/favorite/tv?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc&page=1&session_id=${sessionId}`);
export const fetchShow = (showid) => axios.get(`${baseUrl}/tv/${showid}?api_key=${API_KEY}&language=en-US`);
export const fetchSeason = (showid, seasonnumber) => axios.get(`${baseUrl}/tv/${showid}/season/${seasonnumber}?api_key=${API_KEY}&language=en-US`);
export const fetchEpisode = (showid, seasonnumber, episodenumber) => axios.get(`${baseUrl}/tv/${showid}/season/${seasonnumber}/episode/${episodenumber}?api_key=${API_KEY}&language=en-US`);

export const createRequestToken = () => axios.get(`${baseUrl}/authentication/token/new?api_key=${API_KEY}`);
export const validateWithLogin = (userData) => axios.post(`${baseUrl}/authentication/token/validate_with_login?api_key=${API_KEY}`, userData);
export const createSession = (token) => axios.post(`${baseUrl}/authentication/session/new?api_key=${API_KEY}`, token);
export const getAccount = (sessionId) => axios.get(`${baseUrl}/account?api_key=${API_KEY}&session_id=${sessionId}`);
export const deleteSession = (sessionId) => axios.delete(`${baseUrl}/authentication/session?api_key=${API_KEY}`, sessionId);