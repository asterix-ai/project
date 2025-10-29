import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Image, Fish, X, Save } from 'lucide-react';

import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';

import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { addProduct, updateProduct, deleteProduct } from '../services/productService';

const ProductManagementPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: products, loading: firestoreLoading, error: firestoreError } = useFirestore('products');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.name);
      setProductPrice(editingProduct.price);
      setProductDescription(editingProduct.description || '');
      setProductImageUrl(editingProduct.imageUrl || '');
      setIsFormOpen(true);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setEditingProduct(null);
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImageUrl('');
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('الرجاء تسجيل الدخول لإدارة المنتجات.', { icon: '🚫' });
      return;
    }

    if (!productName.trim() || !productPrice) {
      toast.error('الاسم والسعر مطلوبان.', { icon: '⚠️' });
      return;
    }

    setFormLoading(true);
    try {
      const productData = {
        name: productName.trim(),
        price: parseFloat(productPrice),
        description: productDescription.trim(),
        imageUrl: productImageUrl.trim(),
        updatedAt: new Date(),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success('تم تحديث المنتج بنجاح!', { icon: '🎉' });
      } else {
        productData.createdAt = new Date();
        productData.userId = user.uid;
        await addProduct(productData);
        toast.success('تم إضافة المنتج بنجاح!', { icon: '✅' });
      }
      resetForm();
    } catch (error) {
      console.error('خطأ في حفظ المنتج:', error);
      toast.error(`خطأ في حفظ المنتج: ${error.message}`, { icon: '🚨' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!user) {
      toast.error('الرجاء تسجيل الدخول لحذف المنتجات.', { icon: '🚫' });
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setFormLoading(true); // Re-use formLoading for overall page actions
      try {
        await deleteProduct(productId);
        toast.success('تم حذف المنتج بنجاح!', { icon: '🗑️' });
      } catch (error) {
        console.error('خطأ في حذف المنتج:', error);
        toast.error(`خطأ في حذف المنتج: ${error.message}`, { icon: '🚨' });
      } finally {
        setFormLoading(false);
      }
    }
  };

  if (authLoading || firestoreLoading) {
    return (
      <div className=\"flex items-center justify-center min-h-[calc(100vh-160px)]\">
        <LoadingSpinner loading={true} text=\"جاري تحميل المنتجات...\" />
      </div>
    );
  }

  if (firestoreError) {
    return (
      <div className=\"text-center text-rose-500 dark:text-rose-400 p-8\">
        <h2 className=\"text-2xl font-bold mb-4\">خطأ في تحميل البيانات</h2>
        <p>حدث خطأ أثناء جلب المنتجات: {firestoreError.message}</p>
        <p>يرجى التأكد من تسجيل الدخول وقواعد أمان Firebase.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=\"flex flex-col gap-8\"
    >
      <div className=\"flex justify-between items-center mb-6\">
        <h1 className=\"text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3\">
          <Fish className=\"w-8 h-8 text-indigo-500\" />
          إدارة المنتجات
        </h1>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} icon={Plus}>
          {isFormOpen ? 'إغلاق النموذج' : 'إضافة منتج جديد'}
        </Button>
      </div>

      {isFormOpen && (
        <Card className=\"mb-8 p-6 sm:p-8 lg:p-10\">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className=\"text-2xl font-semibold mb-6 text-gray-800 dark:text-white\">
              {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h2>
            <form onSubmit={handleSubmit} className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
              <Input
                label=\"اسم المنتج\"
                id=\"name\"
                type=\"text\"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder=\"سمك السلمون الطازج\"
                required
              />
              <Input
                label=\"السعر (بالدينار/الريال)\"
                id=\"price\"
                type=\"number\"
                step=\"0.01\"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder=\"25.50\"
                required
              />
              <div className=\"md:col-span-2\">
                <Input
                  label=\"وصف المنتج\"
                  id=\"description\"
                  type=\"text\"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder=\"سمك سلمون فاخر غني بأوميغا 3، مثالي للشوي أو الخبز.\"
                />
              </div>
              <div className=\"md:col-span-2\">
                <Input
                  label=\"رابط صورة المنتج (اختياري)\"
                  id=\"imageUrl\"
                  type=\"url\"
                  value={productImageUrl}
                  onChange={(e) => setProductImageUrl(e.target.value)}
                  placeholder=\"https://example.com/fish.jpg\"
                  icon={Image}
                />
              </div>
              <div className=\"md:col-span-2 flex justify-end gap-4 mt-4\">
                <Button type=\"button\" onClick={resetForm} className=\"bg-gray-400 hover:bg-gray-500 from-gray-500 to-gray-600 text-white\" icon={X}>
                  إلغاء
                </Button>
                <Button type=\"submit\" disabled={formLoading} icon={Save}>
                  {formLoading ? <LoadingSpinner loading={true} size={20} color=\"#fff\" text=\"\" /> : (editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج')}
                </Button>
              </div>
            </form>
          </motion.div>
        </Card>
      )}

      <h2 className=\"text-2xl font-bold text-gray-900 dark:text-white mb-4\">المنتجات المتوفرة ({products.length})</h2>

      {products.length === 0 && !firestoreLoading ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=\"text-center text-gray-600 dark:text-gray-400 text-lg py-8\"
        >
          لا توجد منتجات حاليًا. ابدأ بإضافة منتج جديد!
        </motion.p>
      ) : (
        <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6\">
          {products.map((product) => (
            <Card key={product.id} className=\"flex flex-col h-full\">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className=\"w-full h-48 object-cover rounded-t-2xl mb-4\"
                />
              )}
              <h3 className=\"text-xl font-semibold text-gray-900 dark:text-white mb-2\">{product.name}</h3>
              <p className=\"text-gray-700 dark:text-gray-300 text-lg font-medium mb-3\">{product.price.toFixed(2)} دينار</p>
              <p className=\"text-gray-600 dark:text-gray-400 text-sm flex-grow mb-4\">{product.description || 'لا يوجد وصف.'}</p>
              <div className=\"mt-auto flex justify-end gap-3\">
                <Button
                  onClick={() => setEditingProduct(product)}
                  className=\"!px-4 !py-2 from-cyan-500 to-blue-600 hover:scale-100 hover:-translate-y-0 text-sm\"
                  icon={Edit}
                >
                  تعديل
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  className=\"!px-4 !py-2 from-rose-500 to-pink-600 hover:scale-100 hover:-translate-y-0 text-sm\"
                  icon={Trash2}
                >
                  حذف
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductManagementPage;
