const headers = async (req,res, next) =>{
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '3600'); // Tiempo en segundos
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        
        // Permitir que el middleware continúe con las solicitudes OPTIONS
        if (req.method === 'OPTIONS') {
            return next();
        }

        // Si no es una solicitud OPTIONS, continuar con el siguiente middleware
        next();
    } catch (error) {
        return res.status(402).json({message: "Error setting headers", error: error});
    }
}

module.exports = { headers };