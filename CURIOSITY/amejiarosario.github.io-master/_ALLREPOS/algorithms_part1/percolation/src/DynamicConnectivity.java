/**
 * 
 */

/**
 * @author adrian
 *
 */
public interface DynamicConnectivity {

	/**
	 * Add connection between p and q
	 * @param p 
	 * @param q
	 */
	public abstract void union(int p, int q);

	/**
	 * Check if p and q they are connected
	 * @param p
	 * @param q
	 * @return
	 */
	public abstract boolean connected(int p, int q);

}