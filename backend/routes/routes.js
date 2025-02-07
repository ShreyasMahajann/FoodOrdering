import user from './users';
import admin from './admin';
import { verifyToken, isAdmin } from './middleware/auth';
import {products} from '../controllers/controllers';


router.get('/products', products);

router.use(verifyToken);
app.use('/user',user);

app.use(isAdmin);
app.use('/admin',admin);


export default router;