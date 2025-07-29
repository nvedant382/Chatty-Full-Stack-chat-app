export const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                error: "Validation error",
                details: err.details.map((d) => d.message),
            });
        }
    };
};