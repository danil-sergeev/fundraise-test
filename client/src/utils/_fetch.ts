/*
 Не получилось нормально отправлять запрос, из за того что нгинкс на локалхосте.
 На серваке спокойно бы работало по имени контейнера и через нгинкc роутилось бы.
 */
export const apiUrl = 'http://localhost:8000';
export const createApiEndpoint = (endpoint: string): string => `${apiUrl}${endpoint}`;
